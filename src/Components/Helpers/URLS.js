import {ServerName} from "../../Config";
import proto from "../../protojs/compiled";

export function GetProfileURL(userId) {
    return `ws://${ServerName}/profiles/${userId}`;
}

export function GetGameURL(userId, gameID, aiId, gameType) {
    switch(gameType){
        case proto.GameType.AI_BO1_CONSTRUCTED:
            return `ws://${ServerName}/ai/${userId}/${gameID}/${aiId}`;
        case proto.GameType.BO1_CONSTRUCTED:
            return `ws://${ServerName}/games/${userId}/${gameID}`;
        case proto.GameType.P2_DRAFT:
            return `ws://${ServerName}/drafts/${userId}/${gameID}`;
    }
}



export const cardBackURL = process.env.PUBLIC_URL + "/img/card-backs/card-back-3.png";

export const knowledgeIconURLs =
    {
        "green" : process.env.PUBLIC_URL +
            "/img/card-components/knowledge-G.png",
        "red" : process.env.PUBLIC_URL +
            "/img/card-components/knowledge-R.png",
        "blue" : process.env.PUBLIC_URL +
            "/img/card-components/knowledge-U.png",
        "purple" : process.env.PUBLIC_URL +
            "/img/card-components/knowledge-P.png",
        "yellow" : process.env.PUBLIC_URL +
            "/img/card-components/knowledge-Y.png",
        "colorless" : process.env.PUBLIC_URL +
                "/img/card-components/knowledge-C.png",
            "G" : process.env.PUBLIC_URL +
                "/img/card-components/knowledge-G.png",
            "R" : process.env.PUBLIC_URL +
                "/img/card-components/knowledge-R.png",
            "B" : process.env.PUBLIC_URL +
                "/img/card-components/knowledge-U.png",
            "P" : process.env.PUBLIC_URL +
                "/img/card-components/knowledge-P.png",
            "Y" : process.env.PUBLIC_URL +
                "/img/card-components/knowledge-Y.png",
            "C" : process.env.PUBLIC_URL +
                "/img/card-components/knowledge-C.png",
    };