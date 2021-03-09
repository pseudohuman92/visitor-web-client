// Handles ServerMessage messages.
import {ProtoSocket} from "../../protojs/ProtoSocket.js";
import {GetProfileURL} from "../Helpers/URLS";
import ServerGameMessageHandler from "./ServerGameMessageHandler";
import * as proto from "../../protojs/compiled";

export default class ServerMessageHandler {
    constructor(userId, updateHandlers, updateExtendedGameState, callback) {
        this.userId = userId;
        this.protoSocket = new ProtoSocket(GetProfileURL(this.userId), this.handleMsg);
        this.updateHandlers = updateHandlers;
        this.updateExtendedGameState = updateExtendedGameState;
        this.gameId = "";
        this.playerId = "";
        this.aiId = "";
        this.callback = callback;
    }

    handleMsg = (msgType, params) => {
        switch (msgType) {
            case "LoginResponse":
                if (params.gameId !== "") {
                    this.gameId = params.gameId;
                    this.playerId = params.playerId;
                    this.updateHandlers({
                        gameHandler: new ServerGameMessageHandler(
                            this.playerId,
                            this.gameId,
                            proto.GameType.BO1_CONSTRUCTED,
                            this.updateExtendedGameState,
                            true
                        )
                    });
                    this.callback();
                }
                break;
            case "NewGame":
                this.gameId = params.game.id;
                this.playerId = params.game.player.id;
                this.aiId = params.aiId;
                this.updateHandlers({
                    gameHandler: new ServerGameMessageHandler(
                        this.playerId,
                        this.gameId,
                        this.aiId,
                        (this.aiId ? proto.GameType.AI_BO1_CONSTRUCTED : proto.GameType.BO1_CONSTRUCTED),
                        this.updateExtendedGameState,
                        false
                    )
                });
                this.updateExtendedGameState({
                    game: params.game
                });
                break;
            case "NewDraft":
                this.gameId = params.draft.id;
                this.playerId = params.draft.playerId;
                this.updateHandlers({
                    gameHandler: new ServerGameMessageHandler(
                        this.playerId,
                        this.gameId,
                        proto.GameType.P2_DRAFT,
                        this.updateExtendedGameState,
                        false
                    )
                });
                this.updateExtendedGameState({
                    draft: params.draft,
                });
                break;
        }
    };

    joinQueue = (gameType, decklist=[], draftId="") => {
        this.protoSocket.send("JoinQueue", {
            gameType: gameType,
            decklist: decklist,
            draftId: draftId,
        });
    };
}
