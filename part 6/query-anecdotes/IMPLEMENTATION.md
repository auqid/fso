# Query Anecdotes App

This application implements exercises 6.21-6.24 from Full Stack Open course, demonstrating:

## Features Implemented:

### Exercise 6.21: Adding New Anecdotes

- ✅ Adding new anecdotes using React Query
- ✅ Automatic rendering of new anecdotes
- ✅ Server-side validation (minimum 5 characters)

### Exercise 6.22: Voting for Anecdotes

- ✅ Voting functionality using React Query mutations
- ✅ Automatic re-rendering of vote counts
- ✅ Optimistic updates

### Exercise 6.23: Notification State Management

- ✅ Notification context using useReducer
- ✅ Notifications for new anecdotes and votes
- ✅ Auto-clear notifications after 5 seconds

### Exercise 6.24: Error Handling

- ✅ Error handling for failed POST requests
- ✅ Display error notifications to users
- ✅ Client-side validation for minimum length

## How to Run:

1. Start the JSON server:

   ```bash
   npm run server
   ```

2. Start the React development server:

   ```bash
   npm run dev
   ```

3. Open your browser to `http://localhost:5174`

## API Endpoints:

- **GET** `/anecdotes` - Get all anecdotes
- **POST** `/anecdotes` - Create new anecdote (requires content ≥ 5 chars)
- **PUT** `/anecdotes/:id` - Update anecdote (for voting)

## Technologies Used:

- React 18
- React Query (@tanstack/react-query)
- React Context API with useReducer
- Axios for HTTP requests
- JSON Server for backend
