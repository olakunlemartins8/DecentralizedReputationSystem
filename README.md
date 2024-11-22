# Decentralized Reputation System

A blockchain-based reputation system that enables decentralized applications to maintain and share user reputation scores while respecting privacy preferences.

## Overview

This smart contract implements a decentralized reputation system that allows:
- Applications to maintain user reputation scores
- Users to manage their privacy settings
- Cross-application reputation queries (subject to privacy settings)
- Transparent and immutable reputation tracking

## Features

- **Reputation Tracking**: Store and update reputation scores per user, per application
- **Privacy Controls**: Users can set their reputation data as public or private
- **Immutable History**: All reputation updates are recorded with block height timestamps
- **Default Privacy**: Public by default, but users can opt out
- **Zero Starting Point**: New users/applications start with a reputation score of 0

## Technical Specifications

### Data Structures

1. **Reputations Map**
   ```clarity
   {
     user: principal,
     app: (string-ascii 64)
   } -> {
     score: uint,
     last-updated: uint
   }
   ```

2. **Privacy Settings Map**
   ```clarity
   {
     user: principal
   } -> {
     is-public: bool
   }
   ```

### Public Functions

#### `add-reputation`
- Adds reputation score for a user in a specific application
- Parameters:
    - `app`: Application identifier (string-ascii 64)
    - `score`: Score to add (uint)
- Returns: New total score

#### `get-reputation`
- Retrieves reputation score for a user in a specific application
- Parameters:
    - `user`: User principal
    - `app`: Application identifier
- Returns: Current score or error if not found

#### `set-privacy`
- Updates user's privacy preferences
- Parameters:
    - `is-public`: Boolean flag for public/private setting
- Returns: Success response

#### `get-privacy`
- Retrieves user's current privacy settings
- Parameters:
    - `user`: User principal
- Returns: Privacy settings object

### Error Codes

- `err-owner-only (u100)`: Operation restricted to contract owner
- `err-not-found (u101)`: Requested data not found

## Implementation Notes

1. Reputation scores are cumulative and can only be increased
2. Block height is recorded with each reputation update
3. Privacy settings default to public if not explicitly set
4. Zero scores are returned for non-existent reputation records

## Security Considerations

1. **Privacy Control**: Users have full control over their reputation visibility
2. **Immutable History**: All reputation changes are permanently recorded
3. **Application Isolation**: Reputation scores are segregated by application
4. **No Negative Scores**: Prevents reputation manipulation through negative scoring

## Usage Examples

### Adding Reputation
```clarity
(add-reputation "my-app" u10)
```

### Checking Reputation
```clarity
(get-reputation tx-sender "my-app")
```

### Setting Privacy
```clarity
(set-privacy false)
```

## Development and Testing

### Prerequisites
- Clarity CLI
- Stacks blockchain node (for deployment)

### Testing Strategy
1. Test reputation addition
2. Verify privacy controls
3. Test cross-application isolation
4. Verify default behaviors
5. Test error conditions

## Future Enhancements

1. Reputation decay mechanism
2. Weighted scoring system
3. Reputation transfer between applications
4. Reputation delegation
5. Multi-signature reputation updates

## License

This project is open source and available under the MIT License.
