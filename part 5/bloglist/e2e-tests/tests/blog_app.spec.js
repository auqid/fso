const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        username: "testuser1",
        name: "Test User",
        password: "password123",
      },
    });
    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    await page.getByText("username").isVisible();
    await page.getByText("password").isVisible();
    await page.getByRole("button", { name: "login" }).isVisible();
  });
  test("User can log in", async ({ page }) => {
    await page.getByTestId("username").fill("testuser1");
    await page.getByTestId("password").fill("password123");
    await page.getByRole("button", { name: "login" }).click();

    await expect(page.getByText("Test User logged in")).toBeVisible();
  });
  test("Login fails with wrong credentials", async ({ page }) => {
    await page.getByTestId("username").fill("testuser1");
    await page.getByTestId("password").fill("wrongpassword");
    await page.getByRole("button", { name: "login" }).click();

    const errorMessage = await page.getByText("Invalid Credentials");
    await expect(errorMessage).toBeVisible();
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await page.getByTestId("username").fill("testuser1");
      await page.getByTestId("password").fill("password123");
      await page.getByRole("button", { name: "login" }).click();
      await expect(page.getByText("Test User logged in")).toBeVisible();
    });

    test("a new blog can be created", async ({ page }) => {
      // Open the blog creation form
      await page.getByRole("button", { name: "new blog" }).click();

      // Fill in the blog details
      await page.getByTestId("title").fill("Test Blog Title");
      await page.getByTestId("author").fill("Test Author");
      await page.getByTestId("url").fill("https://testblog.com");

      // Submit the form
      await page.getByRole("button", { name: "create" }).click();

      // Verify the blog appears in the list
      await expect(page.getByText("Test Blog Title Test Author")).toBeVisible();

      // Verify success message
      await expect(
        page.getByText("a new blog Test Blog Title by Test Author added")
      ).toBeVisible();
    });

    test("blog can be liked", async ({ page }) => {
      // Create a blog first
      await page.getByRole("button", { name: "new blog" }).click();
      await page.getByTestId("title").fill("Test Blog for Liking");
      await page.getByTestId("author").fill("Test Author");
      await page.getByTestId("url").fill("https://testblog.com");
      await page.getByRole("button", { name: "create" }).click();

      // Wait for blog to appear
      await expect(
        page.getByText("Test Blog for Liking Test Author")
      ).toBeVisible();

      // Click view button to show details
      await page.getByRole("button", { name: "view" }).click();

      // Check initial likes (should be 0)
      await expect(page.getByText("likes 0")).toBeVisible();

      // Click like button
      await page.getByRole("button", { name: "like" }).click();

      // Verify likes increased to 1
      await expect(page.getByText("likes 1")).toBeVisible();
    });

    test("user who added the blog can delete the blog", async ({ page }) => {
      // Create a blog first
      await page.getByRole("button", { name: "new blog" }).click();
      await page.getByTestId("title").fill("Blog to Delete");
      await page.getByTestId("author").fill("Test Author");
      await page.getByTestId("url").fill("https://testblog.com");
      await page.getByRole("button", { name: "create" }).click();

      // Wait for blog to appear
      await expect(page.getByText("Blog to Delete Test Author")).toBeVisible();

      // Click view button to show details
      await page.getByRole("button", { name: "view" }).click();

      // Set up dialog handler for confirmation
      page.on("dialog", async (dialog) => {
        expect(dialog.message()).toContain("Remove blog");
        await dialog.accept();
      });

      // Click remove button
      await page.getByRole("button", { name: "remove" }).click();

      // Verify blog is no longer visible
      await expect(
        page.getByText("Blog to Delete Test Author")
      ).not.toBeVisible();
    });

    test("only the user who added the blog sees the delete button", async ({
      page,
      request,
    }) => {
      // Create a blog as the first user
      await page.getByRole("button", { name: "new blog" }).click();
      await page.getByTestId("title").fill("Blog by User 1");
      await page.getByTestId("author").fill("Test Author");
      await page.getByTestId("url").fill("https://testblog.com");
      await page.getByRole("button", { name: "create" }).click();

      // Wait for blog to appear and click view
      await expect(page.getByText("Blog by User 1 Test Author")).toBeVisible();
      await page.getByRole("button", { name: "view" }).click();

      // Verify remove button is visible for the creator
      await expect(page.getByRole("button", { name: "remove" })).toBeVisible();

      // Logout
      await page.getByRole("button", { name: "logout" }).click();

      // Create a second user
      await request.post("/api/users", {
        data: {
          username: "testuser2",
          name: "Test User 2",
          password: "password123",
        },
      });

      // Login as second user
      await page.getByTestId("username").fill("testuser2");
      await page.getByTestId("password").fill("password123");
      await page.getByRole("button", { name: "login" }).click();
      await expect(page.getByText("Test User 2 logged in")).toBeVisible();

      // Click view on the blog created by the first user
      await page.getByRole("button", { name: "view" }).click();

      // Verify remove button is NOT visible for the second user
      await expect(
        page.getByRole("button", { name: "remove" })
      ).not.toBeVisible();
    });

    test("blogs are arranged in order according to likes", async ({ page }) => {
      // Create multiple blogs with different like counts
      const blogs = [
        { title: "Blog with least likes", author: "Author 1", likes: 1 },
        { title: "Blog with most likes", author: "Author 2", likes: 5 },
        { title: "Blog with medium likes", author: "Author 3", likes: 3 },
      ];

      // Create all blogs
      for (const blog of blogs) {
        await page.getByRole("button", { name: "new blog" }).click();
        await page.getByTestId("title").fill(blog.title);
        await page.getByTestId("author").fill(blog.author);
        await page
          .getByTestId("url")
          .fill(`https://${blog.title.replace(/\s+/g, "")}.com`);
        await page.getByRole("button", { name: "create" }).click();
        await expect(
          page.getByText(`${blog.title} ${blog.author}`)
        ).toBeVisible();
      }

      // Like each blog the specified number of times
      for (let i = 0; i < blogs.length; i++) {
        const viewButtons = await page
          .getByRole("button", { name: "view" })
          .all();
        await viewButtons[i].click();

        // Like the blog the specified number of times
        for (let j = 0; j < blogs[i].likes; j++) {
          await page.getByRole("button", { name: "like" }).first().click();
          // Wait a bit for the like to register
          await page.waitForTimeout(100);
        }

        // Hide the blog details
        await page.getByRole("button", { name: "hide" }).first().click();
      }

      // Now verify the order by checking the blogs are displayed in descending order of likes
      const blogElements = await page.locator(".blog").all();

      // Click view on all blogs to see their likes
      for (let i = 0; i < blogElements.length; i++) {
        await page.getByRole("button", { name: "view" }).nth(i).click();
      }

      // Get all like counts in order
      const likeCounts = await page.locator(".blog .likes").allTextContents();
      const likeNumbers = likeCounts.map((text) =>
        parseInt(text.match(/\d+/)[0])
      );

      // Verify they are in descending order
      for (let i = 0; i < likeNumbers.length - 1; i++) {
        expect(likeNumbers[i]).toBeGreaterThanOrEqual(likeNumbers[i + 1]);
      }

      // Verify specific order: "Blog with most likes" should be first
      await expect(page.locator(".blog").first()).toContainText(
        "Blog with most likes"
      );
    });
  });
});
