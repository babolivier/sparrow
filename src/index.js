import * as matrixSDK from 'matrix-js-sdk'

function fetchTopics() {
    matrixSDK.createClient({
        baseUrl: 'https://matrix.trancendances.fr',
    })
    .registerGuest()
    .then((data) => {
        return matrixSDK.createClient({
            baseUrl: 'https://matrix.trancendances.fr',
            accessToken: data['access_token'],
            userId: data['user_id'],
            deviceId: data['device_id'],
        })
    })
    .then((client) => {
        client.publicRooms(function(err, data) {
            for (let publicRoom of data.chunk) {
                if (!publicRoom['guest_can_join']) {
                    continue
                }

                client.roomInitialSync(publicRoom["room_id"], 20)
                .then(async (syncData) => {
                    let name, creator, creationDate, categories
                    let nbMessages = 0
                    for (let stateEvent of syncData.state) {
                        if (stateEvent.type === "m.room.create") {
                            let userID = stateEvent.content.creator
                            let profileInfo = await client.getProfileInfo(stateEvent.content.creator, 'displayname')
                            creator = {
                                userID: userID,
                                displayName: profileInfo.displayname,
                            }
                            creationDate = new Date(stateEvent['origin_server_ts'])

                        }
                        if (stateEvent.type === "m.room.name") {
                            name = stateEvent.content.name
                        }
                        if (stateEvent.type === "m.forum.topic.categories") {
                            categories = stateEvent.content.categories.join(',')
                        }
                    }
                    for (let messageEvent of syncData.messages.chunk) {
                        if (messageEvent.type === "m.room.message") {
                            nbMessages++;
                        }
                    }

                    appendTopic(name, publicRoom['room_id'], creator, creationDate, nbMessages, categories)
                })
            }
        });
    })
    .catch((err) => {
        console.log(err);
    })
}

function appendTopic(name, roomID, creator, creationDate, nbMessages, categories) {
    let list = document.getElementById('topics')
    let el = document.createElement('li')
    let topicMsg = "Topic " + name + " (id " + roomID + ") created by "
        + creator.displayName + " (" + creator.userID + ") on "
        + creationDate.toString() + " containing " + nbMessages + " messages"
    if (categories) {
        topicMsg += ", listed in categorie(s) " + categories
    }
    el.innerHTML = topicMsg
    list.appendChild(el)
}

fetchTopics()
