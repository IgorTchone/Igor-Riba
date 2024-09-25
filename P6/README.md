# Scoreboard API Module

## Description
This module is responsible for updating user scores on the website's leaderboard.
 It allows users to increase their scores by completing actions, and the top 10 scores are displayed live on the leaderboard.

## API Endpoints:

### 1. Update User Score:

- **Method**: `POST`

- **Endpoint**: `/api/update-score`

- **Parameters**:

  - `user_id`: The ID of the user whose score is being updated.

  - `new_score`: The new score to add to the user's total.

### 2. Get Top 10 Scores:

- **Method**: `GET`

- **Endpoint**: `/api/top-10`

- **Description**: Retrieves the top 10 users with the highest scores on the leaderboard.

## Real-Time Updates:

The leaderboard is updated in real-time using WebSockets to ensure that users see the latest scores as they change.

## Security Measures:

To prevent unauthorized score changes, this API uses:

- **Authentication**: Users must authenticate via JWT tokens to update their scores.

- **Rate Limiting**: Limits the number of score update requests to prevent abuse.

## Suggested Improvements:

- Implement pagination for large leaderboards.

- Add category-based filtering for specific scoreboards.

- Add support for real-time notifications when a user reaches a new high score.

