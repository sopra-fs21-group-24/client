24/25 Mai Weekend reports & slides für M3

Marion:
* 2 sache pro wuche?


# Create Game&Lobby
* userToken - makes him creator
* gamemode
* usermode

returns:
```json
{
    gameId: string,
    lobbyId : string // aka roomkey
}
```

# Join Lobby
FE sends:
* userToken
* lobbyId

BE sends - gameID and okay

# Fetch lobby
FE fetches lobby by lobbyId with usertoken
Fe receives:
```json
{
    lobbyId,
    creator,
    users:[{user}],
    isPublic
}
```

# start game
Users fetch the game By id and wait until they receive change that the game has started
Fe sends:
```json
{
    status : "ONGOING",
    userToken
}
```
BE sends:
```json
{

}
```
# Get Game by Id
User navigates on to screen and has the gameID
fetches all the game info with gameId
FE sends 
```json
{
    gameId
    userToken
}
```

```json
BE sends {
    question:[qIds:string, ...],
    currentRound:int
}
```
# Get question Image by ID
FE sends
```json
{
    userToken,
    questionId
}
```

Be returns image

# Send Answer for questionId
FE sends
```json
{
    questionID,
    userToken,
    lat,
    lng
}
```
BE sends 
```json
{
    score : {
        "name": "Player1",
        "score": 3000,
        "totalScore": 5000
        }
}
```
or an error if you're too late!

# Get scores for game by gameId
FE sends 
```json
{
    userToken,
    gameId,
}
```

BE sends
```json
{
    "answer":{
        lat:1,
        lng:4
    },
    "scores": [{
        "name": "Player1",
        "score": 3000,
        "totalScore": 5000
        }, {
        "name": "Player2",
        "score": 2000,
        "totalScore": 6000
        }, {
        "name": "Player3",
        "score": 1000,
        "totalScore": 2000
        }
    ]
}
```