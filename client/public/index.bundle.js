'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

var SocketMessageTypes;
(function (SocketMessageTypes) {
    SocketMessageTypes["playerJoin"] = "joinGame";
    SocketMessageTypes["playerLeave"] = "leaveGame";
    SocketMessageTypes["onNewPlayer"] = "newPlayer";
    SocketMessageTypes["playerIsShoot"] = "shoot";
    SocketMessageTypes["position"] = "p";
    SocketMessageTypes["isDead"] = "isDead";
    SocketMessageTypes["hp"] = "hp";
    SocketMessageTypes["kills"] = "kills";
    SocketMessageTypes["isShooting"] = "isShooting";
    SocketMessageTypes["game"] = "game";
})(SocketMessageTypes || (SocketMessageTypes = {}));

var getPlayerMessageTypePosition = function (userId) { return "p" + userId; };
var getPlayerMessageTypeIsShooting = function (userId) { return "s" + userId; };
var getPlayerMessageTypeHp = function (userId) { return "hp" + userId; };
var getPlayerMessageTypeKills = function (userId) { return "kills" + userId; };
var getPlayerMessageTypeIsDead = function (userId) { return "isDead" + userId; };
var giveId = function (userId, p) { return ({ id: userId, p: p }); };
var GameSocket = /** @class */ (function () {
    function GameSocket() {
        var _this = this;
        this.on = function (msgType, cb) {
            console.debug("on", msgType);
            _this.socket.on(msgType, function (msg) { return cb(msg); });
            return function () { return _this.socket.off(msgType, cb); };
        };
        this.send = function (msgType, data) {
            return _this.socket.emit(msgType, data);
        };
        this.onPlayerIsShooting = function (userId, cb) { return _this.on(getPlayerMessageTypeIsShooting(userId), cb); };
        this.onPlayerPosition = function (userId, cb) { return _this.on(getPlayerMessageTypePosition(userId), cb); };
        this.onPlayerHp = function (userId, cb) {
            return _this.on(getPlayerMessageTypeHp(userId), cb);
        };
        this.onPlayerKills = function (userId, cb) {
            return _this.on(getPlayerMessageTypeKills(userId), cb);
        };
        this.onPlayerIsDead = function (userId, cb) {
            return _this.on(getPlayerMessageTypeIsDead(userId), cb);
        };
        this.onRecieveGame = function (cb) {
            return _this.on(SocketMessageTypes.game, cb);
        };
        this.sendPlayerPosition = function (userId, position) {
            return _this.send(SocketMessageTypes.position, giveId(userId, position));
        };
        this.sendPlayerHp = function (userId, hp) {
            return _this.send(SocketMessageTypes.hp, giveId(userId, hp));
        };
        this.sendPlayerKills = function (userId, kills) {
            return _this.send(SocketMessageTypes.kills, giveId(userId, kills));
        };
        this.sendPlayerIsShooting = function (userId) {
            return _this.send(SocketMessageTypes.isShooting, giveId(userId, true));
        };
        this.sendPlayerIsDead = function (userId, isDead) {
            return _this.send(SocketMessageTypes.isDead, giveId(userId, isDead));
        };
        this.playerIsShoot = function (playerShooterId, playerDamagedId) {
            _this.send(SocketMessageTypes.playerIsShoot, {
                playerShooterId: playerShooterId,
                playerDamagedId: playerDamagedId
            });
        };
        this.sendPlayerJoin = function (userId, name) {
            return _this.send(SocketMessageTypes.playerJoin, { userId: userId, name: name });
        };
        this.sendPlayerLeave = function (userId) {
            return _this.send(SocketMessageTypes.playerLeave, userId);
        };
        this.onPlayerJoin = function (cb) {
            return _this.on(SocketMessageTypes.onNewPlayer, cb);
        };
        this.socket = io("/");
        // this.socket = io("ws://localhost:8001")
    }
    return GameSocket;
}());

var loadTemplate = (function (templateId) {
    var _a;
    var template = (_a = document
        .getElementById(templateId)) === null || _a === void 0 ? void 0 : _a.cloneNode(true);
    if (!template)
        return null;
    template.id = "";
    template.removeAttribute("style");
    return template;
});

var PlayerComponent = /** @class */ (function () {
    function PlayerComponent() {
        var _this = this;
        var _a;
        this.setHp = function (hp) {
            if (!_this.playerHpEl)
                return;
            _this.playerHpEl.style.width = hp + "%";
        };
        this.setName = function (name) {
            if (!_this.playerNameEl)
                return;
            _this.playerNameEl.innerHTML = name;
        };
        this.rotate = function (deg) {
            if (!_this.playerBodyEl)
                return;
            _this.playerBodyEl.style.transform = "rotate(" + deg + "deg)";
        };
        this.move = function (offsetLeft, offsetTop) {
            if (!_this.playerEl)
                return;
            _this.playerEl.style.transform = "translate(" + offsetLeft * 8 + "px, " + offsetTop * 8 + "px)";
        };
        this.setKills = function (kills) {
            if (!_this.playerKillsEl)
                return;
            _this.playerKillsEl.innerHTML = kills.toString();
        };
        this.setShowBullet = function (showBullet) {
            if (!_this.playerBulletEl)
                return;
            if (showBullet)
                _this.playerBulletEl.style.opacity = "1";
            else
                _this.playerBulletEl.style.opacity = "0";
        };
        this.playerEl = loadTemplate("player-template");
        this.playerHpEl = this.playerEl.querySelector("player-hp");
        this.playerNameEl = this.playerEl.querySelector("player-name");
        this.playerGunEl = this.playerEl.querySelector("player-gun");
        this.playerBodyEl = this.playerEl.querySelector("player-body");
        this.playerBulletEl = this.playerEl.querySelector("player-body");
        this.playerKillsEl = this.playerEl.querySelector("kill-display");
        (_a = document.getElementById("player-map")) === null || _a === void 0 ? void 0 : _a.appendChild(this.playerEl);
    }
    return PlayerComponent;
}());

var GAME_UPDATE_MS = 1000 / 60;
var BOX_SIZE = 8;
var WORLD_MAP_HEIGHT = 1500;
var WORLD_MAP_WIDTH = 2500;
var OUTER_WORLD_MAP_BORDER_WIDTH = 1500;
var WORLD_MAP_BOX_WIDTH = WORLD_MAP_WIDTH / BOX_SIZE;
var WORLD_MAP_BOX_HEIGHT = WORLD_MAP_HEIGHT / BOX_SIZE;
var RUN_SPEED = GAME_UPDATE_MS / 2;
var DIAGONAL_RUN_SPEED = RUN_SPEED * Math.sqrt(2);
var PLAYER_BODY_WIDTH = 35;
var PLAYER_BODY_HEIGHT = 18;
var PLAYER_BODY_BOX_SIZE_WIDTH = PLAYER_BODY_WIDTH / BOX_SIZE;
var PLAYER_BODY_BOX_SIZE_HEIGHT = PLAYER_BODY_HEIGHT / BOX_SIZE;
var MAX_MOVEMENT_WORLD_BOX_WIDTH = WORLD_MAP_BOX_WIDTH - PLAYER_BODY_BOX_SIZE_WIDTH - 1;
var MAX_MOVEMENT_WORLD_BOX_HEIGHT = WORLD_MAP_BOX_HEIGHT - PLAYER_BODY_BOX_SIZE_HEIGHT - 1;
var IS_SHOOTING_MS = 30; //  how long to show, // TODO: fix so always one animation frame
var LOCAL_DELAY = 65;

var _a;
var GunTypes;
(function (GunTypes) {
    GunTypes[GunTypes["defaultPistol"] = 0] = "defaultPistol";
    GunTypes[GunTypes["uzi"] = 1] = "uzi";
})(GunTypes || (GunTypes = {}));
var defaultPistol = {
    name: "Pistol",
    rarity: 10000,
    damage: 10,
    range: 300,
    isAutomatic: false,
    reloadTime: 140
};
var uzi = {
    rarity: 10000,
    name: "Uzi",
    damage: 3,
    range: 200,
    isAutomatic: true,
    reloadTime: 35
};
var gunItems = (_a = {},
    _a[GunTypes.defaultPistol] = defaultPistol,
    _a[GunTypes.uzi] = uzi,
    _a);

var Gun = /** @class */ (function () {
    function Gun(onShoot, type) {
        if (type === void 0) { type = GunTypes.defaultPistol; }
        this.onShoot = onShoot;
        this.isReloading = false;
        this.isShooting = false;
        this.damage = gunItems[type].damage;
        this.range = gunItems[type].range;
        this.isAutomatic = gunItems[type].isAutomatic;
        this.reloadTime = gunItems[type].reloadTime;
    }
    Gun.prototype.shoot = function () {
        var _this = this;
        var _a;
        if (this.isReloading || this.isShooting)
            return;
        this.isShooting = true;
        this.isReloading = true;
        (_a = this.onShoot) === null || _a === void 0 ? void 0 : _a.call(this);
        this.reload();
        setTimeout(function () {
            _this.isShooting = false;
        }, IS_SHOOTING_MS);
        // } else {
        //   setInterval(() => {
        //     this.isShooting = true
        //     setTimeout(() => {
        //       this.isShooting = false
        //       this.reload()
        //     }, IS_SHOOTING_MS)
        //   }, this.isReloading)
        // }
    };
    // for remote players etc when recieving singal to shoot
    Gun.prototype.noReloadShoot = function () {
        var _this = this;
        var _a;
        this.isShooting = true;
        (_a = this.onShoot) === null || _a === void 0 ? void 0 : _a.call(this);
        setTimeout(function () {
            _this.isShooting = false;
            _this.reload();
        }, IS_SHOOTING_MS);
    };
    Gun.prototype.reload = function () {
        var _this = this;
        this.isReloading = true;
        setTimeout(function () {
            _this.isReloading = false;
        }, this.reloadTime);
    };
    return Gun;
}());

var Keyboard = /** @class */ (function () {
    function Keyboard(_a) {
        var _this = this;
        var onKeyPress = _a.onKeyPress, onKeyUp = _a.onKeyUp, onNoKeyPressed = _a.onNoKeyPressed;
        this._onKeyPress = function (e) {
            var _a;
            if (_this.pressedKeys[e.key])
                return;
            _this.pressedKeys = __assign(__assign({}, _this.pressedKeys), (_a = {}, _a[e.key] = Date.now(), _a));
            _this.onKeyPress(_this.pressedKeys);
        };
        this._onKeyUp = function (e) {
            var _a = _this.pressedKeys, _b = e.key, id = _a[_b], rest = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
            _this.pressedKeys = rest;
            if (!Object.keys(_this.pressedKeys).length)
                _this.onNoKeyPressed();
            else
                _this.onKeyUp(_this.pressedKeys);
        };
        this.startKeyboard = function () {
            window.addEventListener("keydown", _this._onKeyPress, true);
            window.addEventListener("keyup", _this._onKeyUp, true);
        };
        this.stopKeyboard = function () {
            window.removeEventListener("keydown", _this._onKeyPress, true);
            window.removeEventListener("keyup", _this._onKeyUp, true);
        };
        this.pressedKeys = {};
        this.onKeyUp = onKeyUp;
        this.onKeyPress = onKeyPress;
        this.onNoKeyPressed = onNoKeyPressed;
        this.startKeyboard();
    }
    return Keyboard;
}());

var randomWorldSpawnInitializer = function () {
    return Math.min(MAX_MOVEMENT_WORLD_BOX_WIDTH, Math.max(Math.floor(Math.random() *
        Math.min(MAX_MOVEMENT_WORLD_BOX_WIDTH, MAX_MOVEMENT_WORLD_BOX_HEIGHT)), 3));
};
var PlayerPosition = /** @class */ (function () {
    function PlayerPosition(position, randomInitializer) {
        var _this = this;
        this.setIsWalking = function (isWalking) {
            _this.localIsWalking = isWalking;
            _this.delayIsWalking(isWalking);
        };
        this.setImmediateIsWalking = function (isWalking) {
            _this.localIsWalking = isWalking;
            _this.isWalking = isWalking;
        };
        this.setDirection = function (direction) {
            _this.localDirection = direction;
            _this.delayDirection(direction);
        };
        this.setImmediateDirection = function (direction) {
            _this.localDirection = direction;
            _this.direction = direction;
        };
        this.delayPosition = function (curX, curY) {
            return setTimeout(function () {
                _this.x = curX;
                _this.y = curY;
            }, LOCAL_DELAY);
        };
        this.delayIsWalking = function (isWalking) {
            return setTimeout(function () {
                _this.isWalking = isWalking;
            }, LOCAL_DELAY);
        };
        this.delayDirection = function (direction) {
            return setTimeout(function () {
                _this.direction = direction;
            }, LOCAL_DELAY);
        };
        this.x = position ? position.x : null;
        this.y = position ? position.y : null;
        this.localX = position ? position.x : null;
        this.localY = position ? position.y : null;
        this.localDirection = position ? position.d : 0;
        this.direction = position ? position.d : 0;
        this.localIsWalking = position ? position.w : false;
        this.isWalking = position ? position.w : false;
        if (randomInitializer)
            this.randomizePosition();
    }
    PlayerPosition.prototype.randomizePosition = function () {
        this.setPosition(function () { return ({
            x: randomWorldSpawnInitializer(),
            y: randomWorldSpawnInitializer()
        }); });
    };
    PlayerPosition.prototype.walkOneStepTowards = function (_a) {
        var x = _a.x, y = _a.y;
        this.setPosition(function (p) { return ({
            x: p.x ? p.x + x : x,
            y: p.y ? p.y + y : y
        }); });
    };
    PlayerPosition.prototype.setPosition = function (cb) {
        var newPos = cb({ x: this.localX, y: this.localY });
        var newX = Math.min(MAX_MOVEMENT_WORLD_BOX_WIDTH, Math.max(newPos.x || 0, 1));
        var newY = Math.min(MAX_MOVEMENT_WORLD_BOX_HEIGHT, Math.max(newPos.y || 0, 2));
        this.localX = newX;
        this.localY = newY;
        this.delayPosition(newX, newY);
    };
    // this does not
    PlayerPosition.prototype.setImmediatePosition = function (position) {
        this.localX = position.x;
        this.localY = position.y;
        this.x = position.x;
        this.y = position.y;
    };
    return PlayerPosition;
}());

var KeyMappingTypes;
(function (KeyMappingTypes) {
    KeyMappingTypes["up"] = "up";
    KeyMappingTypes["left"] = "left";
    KeyMappingTypes["down"] = "down";
    KeyMappingTypes["right"] = "right";
    KeyMappingTypes["shoot"] = "shoot";
})(KeyMappingTypes || (KeyMappingTypes = {}));
var primaryKeybinding = {
    up: "w",
    left: "a",
    right: "d",
    down: "s",
    shoot: " "
};

var Directions;
(function (Directions) {
    Directions[Directions["up"] = 0] = "up";
    Directions[Directions["upRight"] = 1] = "upRight";
    Directions[Directions["right"] = 2] = "right";
    Directions[Directions["downRight"] = 3] = "downRight";
    Directions[Directions["down"] = 4] = "down";
    Directions[Directions["downLeft"] = 5] = "downLeft";
    Directions[Directions["left"] = 6] = "left";
    Directions[Directions["upLeft"] = 7] = "upLeft";
    Directions[Directions["still"] = 8] = "still";
})(Directions || (Directions = {}));

var LocalPlayer = /** @class */ (function () {
    function LocalPlayer(player, socket, buttonMapping) {
        var _this = this;
        if (buttonMapping === void 0) { buttonMapping = primaryKeybinding; }
        this.listenToDB = function () {
            // const positionOff = this.socket.onPlayerPosition(this.id, position => {
            //   if (!position || this.isDead) return
            //   this.position.unsafeSet(position)
            //   this.direction = position.d
            // })
            // const isShootingOff = this.socket.onPlayerIsShooting(this.id, state => {
            //   state && !this.gun.isReloading && this.gun.shoot()
            // })
            var hpOff = _this.socket.onPlayerHp(_this.id, function (hp) {
                if (typeof hp !== "number")
                    return;
                _this.hp = hp;
            });
            var playerKillsOff = _this.socket.onPlayerKills(_this.id, function (kills) {
                if (typeof kills !== "number")
                    return;
                _this.kills = kills;
            });
            var isDeadOff = _this.socket.onPlayerIsDead(_this.id, function (isDead) {
                if (isDead)
                    _this.remove();
                _this.isDead = isDead;
            });
            var socketOffs = [
                // isShootingOff,
                hpOff,
                playerKillsOff,
                isDeadOff
                // positionOff
            ];
            _this.removeSocketListeners = function () {
                return socketOffs.filter(Boolean).forEach(function (f) { return f === null || f === void 0 ? void 0 : f(); });
            };
        };
        this.updateWalking = function (pressedKeys) {
            var resp = _this.getDirectionFromKeys(pressedKeys);
            if (!resp)
                return;
            var walkOneStep = resp.walkOneStep, walkSpeed = resp.walkSpeed;
            _this.stopWalking();
            _this.position.setIsWalking(true);
            _this.sendPosition();
            walkOneStep();
            _this.walkIntervalId = setInterval(function () {
                walkOneStep();
            }, walkSpeed);
        };
        this.getDirectionFromKeys = function (pressedKeys, opts) {
            var directions = [];
            Object.keys(pressedKeys).forEach(function (b) {
                if (b === _this.buttonMapping.up)
                    directions.push(Directions.up);
                else if (b === _this.buttonMapping.down)
                    directions.push(Directions.down);
                else if (b === _this.buttonMapping.left)
                    directions.push(Directions.left);
                else if (b === _this.buttonMapping.right)
                    directions.push(Directions.right);
                else if (b === _this.buttonMapping.shoot) {
                    if (pressedKeys[b] !== _this.lastShootId) {
                        _this.lastShootId = pressedKeys[b];
                        _this.gun.shoot();
                    }
                }
            });
            if (!directions.length) {
                _this.stopWalking();
                _this.sendPosition();
                return;
            }
            // player might hold more than 2 buttons, take most recent and combine it with its closest neighbour
            if (directions.length > 2) {
                var mostRecent_1 = directions.sort(function (a, b) {
                    return pressedKeys[a] >= pressedKeys[b] ? 1 : 0;
                })[0];
                directions = directions
                    .sort(function (a, b) {
                    return Math.abs(mostRecent_1 - a) >= Math.abs(mostRecent_1 - b) ? 1 : 0;
                })
                    .slice(0, 2);
            }
            var valueOfDirections = directions.reduce(function (a, b) { return a + b; });
            if (valueOfDirections === 6 &&
                directions.includes(Directions.left) &&
                directions.length === 2)
                valueOfDirections = 14; // handling that up can both be 0 and 360 degrees
            var direction = valueOfDirections / directions.length;
            var diagonal = direction % 2 !== 0;
            _this.position.setDirection(direction);
            if (opts === null || opts === void 0 ? void 0 : opts.onlyUpdateDirection)
                return;
            return {
                walkOneStep: function () {
                    return _this.position.walkOneStepTowards(_this.getStep(directions));
                },
                walkSpeed: diagonal ? DIAGONAL_RUN_SPEED : RUN_SPEED
            };
        };
        this.getStep = function (directions) {
            return directions.reduce(function (moveStep, d) {
                if (0 === d)
                    return __assign(__assign({}, moveStep), { y: -1 });
                if (4 === d)
                    return __assign(__assign({}, moveStep), { y: 1 });
                if (2 === d)
                    return __assign(__assign({}, moveStep), { x: 1 });
                if (6 === d)
                    return __assign(__assign({}, moveStep), { x: -1 });
                return moveStep;
            }, { x: 0, y: 0 });
        };
        this.stopWalking = function () {
            _this.position.setIsWalking(false);
            _this.walkIntervalId && clearInterval(_this.walkIntervalId);
        };
        this.sendPosition = function () {
            _this.socket.sendPlayerPosition(_this.id, {
                x: _this.position.localX,
                y: _this.position.localY,
                d: _this.position.localDirection,
                w: _this.position.localIsWalking
            });
        };
        this.remove = function () {
            var _a;
            (_a = _this.removeSocketListeners) === null || _a === void 0 ? void 0 : _a.call(_this);
            _this.keyboard.stopKeyboard();
            _this.stopWalking();
        };
        this.draw = function () {
            _this.playerComponent.rotate(45 * (_this.position.direction || 0));
            _this.kills && _this.playerComponent.setKills(_this.kills);
            _this.playerComponent.setName(_this.name);
            _this.playerComponent.setHp(_this.hp);
            _this.playerComponent.setShowBullet(_this.gun.isShooting);
            _this.position.x &&
                _this.position.y &&
                _this.playerComponent.move(_this.position.x, _this.position.y);
            _this.playerComponent;
        };
        this.id = player.userId;
        this.name = player.name;
        this.socket = socket;
        this.buttonMapping = buttonMapping;
        this.hp = player.hp;
        this.isDead = player.isDead;
        this.kills = player.kills;
        this.lastShootId = null;
        this.walkIntervalId = null;
        this.removeSocketListeners = null;
        // localPosition is internal position that is sent to server, actual position is not set until emitted from server
        this.position = new PlayerPosition(player.position);
        this.gun = new Gun(function () { return socket.sendPlayerIsShooting(_this.id); });
        this.keyboard = new Keyboard({
            onKeyPress: this.updateWalking,
            onKeyUp: this.updateWalking,
            onNoKeyPressed: function () {
                _this.stopWalking();
                _this.sendPosition();
            }
        });
        this.playerComponent = new PlayerComponent();
        this.listenToDB();
    }
    return LocalPlayer;
}());

var RemotePlayer = /** @class */ (function () {
    function RemotePlayer(player, removeSelf, socket) {
        var _this = this;
        this.setupSocketListeners = function () {
            var positionOff = _this.socket.onPlayerPosition(_this.id, function (position) {
                if (!position || _this.isDead)
                    return;
                _this.position.setImmediatePosition(position);
                _this.position.setImmediateDirection(position.d);
                _this.position.setImmediateIsWalking(position.w);
            });
            var hpOff = _this.socket.onPlayerHp(_this.id, function (hp) {
                if (typeof hp !== "number")
                    return;
                _this.hp = hp;
            });
            var killsOff = _this.socket.onPlayerKills(_this.id, function (kills) {
                if (typeof kills !== "number")
                    return;
                _this.kills = kills;
            });
            var isDeadOff = _this.socket.onPlayerIsDead(_this.id, function (isDead) {
                if (isDead) {
                    _this.remove();
                    _this.removeSelf();
                }
                _this.isDead = isDead;
            });
            var isShootingOff = _this.socket.onPlayerIsShooting(_this.id, function (isShooting) {
                isShooting && !_this.gun.isReloading && _this.gun.noReloadShoot();
            });
            var socketOffs = [positionOff, hpOff, killsOff, isDeadOff, isShootingOff];
            _this.removeSocketListeners = function () {
                return socketOffs.filter(Boolean).forEach(function (f) { return f === null || f === void 0 ? void 0 : f(); });
            };
        };
        this.remove = function () {
            var _a;
            (_a = _this.removeSocketListeners) === null || _a === void 0 ? void 0 : _a.call(_this);
        };
        this.draw = function () {
            _this.playerComponent.rotate(45 * (_this.position.direction || 0));
            _this.kills && _this.playerComponent.setKills(_this.kills);
            _this.playerComponent.setName(_this.name);
            _this.playerComponent.setHp(_this.hp);
            _this.playerComponent.setShowBullet(_this.gun.isShooting);
            _this.position.x &&
                _this.position.y &&
                _this.playerComponent.move(_this.position.x, _this.position.y);
            _this.playerComponent;
        };
        this.id = player.userId;
        this.hp = player.hp;
        this.name = player.name;
        this.isDead = player.isDead;
        this.kills = player.kills;
        this.removeSelf = removeSelf;
        this.removeSocketListeners = null;
        this.gun = new Gun();
        this.position = new PlayerPosition(player.position);
        this.socket = socket;
        // super hack to rerender after new value.
        // TODO: refactor to a hook
        // db.onPlayerPosition(this.id, position => {
        //   if (!position || this.isDead) return
        //   this.position.unsafeSet(position)
        //   this.direction = position.d
        // })
        this.playerComponent = new PlayerComponent();
        this.setupSocketListeners();
    }
    return RemotePlayer;
}());

var PlayerScrollMap = /** @class */ (function () {
    function PlayerScrollMap(player, playerViewport) {
        var _this = this;
        this.scroll = function () {
            if (!_this.playerViewport)
                return;
            if (!_this.player.position.x || !_this.player.position.y) {
                _this.playerViewport.scrollTop = _this.scrollOffsetY + WORLD_MAP_HEIGHT / 2;
                _this.playerViewport.scrollLeft = _this.scrollOffsetX + WORLD_MAP_WIDTH / 2;
                return;
            }
            _this.playerViewport.scrollTop =
                _this.player.position.y * BOX_SIZE + _this.scrollOffsetY;
            _this.playerViewport.scrollLeft =
                _this.player.position.x * BOX_SIZE + _this.scrollOffsetX;
        };
        this.onResize = function () {
            _this.scrollOffsetY =
                OUTER_WORLD_MAP_BORDER_WIDTH / 2 - window.innerHeight / 2;
            _this.scrollOffsetX =
                OUTER_WORLD_MAP_BORDER_WIDTH / 2 - window.innerWidth / 2;
        };
        this.setup = function () {
            window.addEventListener("resize", _this.onResize);
        };
        this.player = player;
        this.playerViewport = playerViewport;
        this.scrollOffsetY =
            OUTER_WORLD_MAP_BORDER_WIDTH / 2 - window.innerHeight / 2;
        this.scrollOffsetX =
            OUTER_WORLD_MAP_BORDER_WIDTH / 2 - window.innerWidth / 2;
    }
    return PlayerScrollMap;
}());

var Game = /** @class */ (function () {
    function Game(localPlayerId, viewportEl, keyBinding) {
        var _this = this;
        this.removeRemotePlayer = function (userId) {
            return (_this.remotePlayers = _this.remotePlayers.filter(function (remotePlayer) {
                if (remotePlayer.id !== userId)
                    return true;
                remotePlayer.remove();
                return false;
            }));
        };
        this.addRemotePlayer = function (newPlayer) {
            return newPlayer.userId !== _this.localPlayerId &&
                !_this.remotePlayers.map(function (r) { return r.id; }).includes(newPlayer.userId) &&
                _this.remotePlayers.push(new RemotePlayer(newPlayer, function () { return _this.removeRemotePlayer(newPlayer.userId); }, _this.socket));
        };
        this.isLocalPlayer = function (userId) { return _this.localPlayerId === userId; };
        this.isRemotePlayer = function (userId) {
            return _this.remotePlayers.map(function (r) { return r.id; }).includes(userId);
        };
        this.getRemotePlayer = function (userId) {
            return _this.remotePlayers.find(function (r) { return r.id === userId; });
        };
        this.doesPlayerExist = function (userId) {
            return _this.isLocalPlayer(userId) || _this.isRemotePlayer(userId);
        };
        this.getPlayer = function (userId) {
            if (_this.isLocalPlayer(userId))
                return _this.localPlayer;
            else if (_this.isRemotePlayer(userId))
                return _this.getRemotePlayer(userId);
        };
        this.updateOrAddPlayer = function (createPlayer) {
            var player = _this.getPlayer(createPlayer.userId);
            if (player) {
                player.hp = createPlayer.hp;
                player.kills = createPlayer.kills;
                player.position.setImmediatePosition({
                    x: createPlayer.position.x,
                    y: createPlayer.position.y
                });
                player.position.setImmediateDirection(createPlayer.position.d);
                player.hp = createPlayer.hp;
            }
            else {
                !_this.isLocalPlayer(createPlayer.userId) &&
                    _this.addRemotePlayer(createPlayer);
            }
        };
        this.isShoot = function () {
            var _a;
            if (!((_a = _this.localPlayer) === null || _a === void 0 ? void 0 : _a.gun.isShooting))
                return;
            var _b = _this, localPlayer = _b.localPlayer, remotePlayers = _b.remotePlayers;
            // const localBullet = bulletElements.current[localPlayer.id]
            // if (!localBullet) return
            // const asyncCheckBulletHit = async () => {
            //   remotePlayers.forEach(remotePlayer => {
            //     if (remotePlayer.isDead || remotePlayer.hp <= 0) return
            //     const remoteDude = playerElements.current[remotePlayer.id]
            //     if (!isPlayerShoot(localBullet, remoteDude)) return
            //     // use this insted of calculating hp directly to not risk using old data
            //     game.socket.playerIsShoot(localPlayer.id, remotePlayer.id)
            //   })
            // }
            // asyncCheckBulletHit()
        };
        this.setupListeners = function () {
            _this.socket.onPlayerJoin(function (newPlayer) {
                var _a;
                if (newPlayer.userId === _this.localPlayerId) {
                    (_a = _this.localPlayer) === null || _a === void 0 ? void 0 : _a.remove(); // just to make sure. cleaning up listeners etc
                    _this.localPlayer = new LocalPlayer(newPlayer, _this.socket, _this.keyBinding);
                    _this.playerScrollMap = new PlayerScrollMap(_this.localPlayer, _this.viewportEl);
                }
                else {
                    _this.addRemotePlayer(newPlayer);
                }
            });
            _this.socket.onRecieveGame(function (game) {
                Object.values(game).map(function (player) { return _this.updateOrAddPlayer(player); });
            });
        };
        this.endGame = function () {
            var _a;
            (_a = _this.stopListeners) === null || _a === void 0 ? void 0 : _a.call(_this);
        };
        this.addLocalPlayer = function (name) {
            _this.socket.sendPlayerJoin(_this.localPlayerId, name);
        };
        this.drawPlayers = function () {
            __spreadArrays((_this.localPlayer ? [_this.localPlayer] : []), _this.remotePlayers).forEach(function (p) {
                p.draw();
            });
        };
        this.update = function () {
            var _a;
            _this.isShoot();
            _this.drawPlayers();
            (_a = _this.playerScrollMap) === null || _a === void 0 ? void 0 : _a.scroll();
        };
        this.localPlayerId = localPlayerId;
        this.viewportEl = viewportEl;
        this.localPlayer = null;
        this.remotePlayers = [];
        this.stopListeners = null;
        this.gameIsLoading = false;
        this.keyBinding = keyBinding;
        this.socket = new GameSocket();
        this.playerScrollMap = null;
        // this.socket.sendPlayerLeave(localPlayerId)
        this.setupListeners();
    }
    return Game;
}());

var getUserId = function () { return localStorage.xcs; };
var generateAndGetUserId = function () {
    var newID = Date.now().toString().slice(4, -1);
    localStorage.setItem("xcs", newID);
    return newID;
};

var dqs = function (query) {
    return document.querySelector(query);
};

var BetterEvents = /** @class */ (function () {
    function BetterEvents(element) {
        var _this = this;
        // how do typescript have no type for eventName to event
        this.addListener = function (listener, func) {
            var _a;
            if (_this.eventListeners[listener]) {
                console.warn("tried to set 2 same event listeners - ## -", _this.element, listener, func);
                _this.removeListener(listener);
            }
            (_a = _this.element) === null || _a === void 0 ? void 0 : _a.addEventListener(listener, func);
            _this.eventListeners[listener] = func;
        };
        this.removeListener = function (listener) { var _a; return (_a = _this.element) === null || _a === void 0 ? void 0 : _a.removeEventListener(listener, _this.eventListeners[listener]); };
        this.removeAllListeners = function () {
            return Object.entries(_this.eventListeners).forEach(function (ent) { var _a; return (_a = _this.element) === null || _a === void 0 ? void 0 : _a.removeEventListener(ent[0], ent[1]); });
        };
        this.element = element;
        this.eventListeners = {};
    }
    return BetterEvents;
}());
// who df invented dealing with elements in vanilla js
var BetterElement = /** @class */ (function () {
    function BetterElement(selector, opts) {
        var _this = this;
        if (opts === void 0) { opts = {
            hidden: false,
            visibleDisplay: "flex"
        }; }
        var _a;
        this.findElement = function () { return dqs(_this.selector); };
        this.refresh = function () {
            if (_this.element)
                _this.events = new BetterEvents(_this.element);
            _this.element = _this.findElement();
        };
        this.insertText = function (text) {
            var _a;
            var dynamicTextEl = (_a = _this.element) === null || _a === void 0 ? void 0 : _a.querySelector(".dynamic-text");
            if (!dynamicTextEl)
                return;
            dynamicTextEl.innerHTML = text;
        };
        this.setValue = function (value) {
            if (!_this.element)
                return;
            _this.element.value = value;
        };
        this.hide = function () {
            if (!_this.element)
                return;
            _this.display = _this.element.style.display;
            _this.element.style.display = "none";
        };
        this.show = function () {
            if (!_this.element)
                return;
            _this.element.style.display =
                _this.display || _this.opts.visibleDisplay || "flex"; // arbitrary default
        };
        this.addListener = function (listener, func) { var _a; return (_a = _this.events) === null || _a === void 0 ? void 0 : _a.addListener(listener, func); };
        this.removeListener = function (listener) { var _a; return (_a = _this.events) === null || _a === void 0 ? void 0 : _a.removeListener(listener); };
        this.removeAllListeners = function () { var _a; return (_a = _this.events) === null || _a === void 0 ? void 0 : _a.removeAllListeners(); };
        this.removeElement = function () {
            var _a, _b;
            (_a = _this.events) === null || _a === void 0 ? void 0 : _a.removeAllListeners();
            (_b = _this.element) === null || _b === void 0 ? void 0 : _b.remove();
        };
        this.opts = opts;
        this.selector = selector;
        this.element = this.findElement();
        this.display = ((_a = this.element) === null || _a === void 0 ? void 0 : _a.style.display) || opts.visibleDisplay;
        if (this.element)
            this.events = new BetterEvents(this.element);
        if (opts.hidden)
            this.hide();
    }
    return BetterElement;
}());

// TODO: probably refactor to get elements on demand instead of in contrsuctor?
var StartScreenComponent = /** @class */ (function () {
    function StartScreenComponent(keyBinding, game) {
        var _this = this;
        var _a;
        this.updateBindingButton = function (button, text) {
            return button.insertText(text === " " ? "Space" : text);
        };
        this.updateBindingButtons = function () {
            _this.updateBindingButton(_this.els.bindingButtonUp, _this.keyBinding[KeyMappingTypes.up]);
            _this.updateBindingButton(_this.els.bindingButtonDown, _this.keyBinding[KeyMappingTypes.down]);
            _this.updateBindingButton(_this.els.bindingButtonLeft, _this.keyBinding[KeyMappingTypes.left]);
            _this.updateBindingButton(_this.els.bindingButtonRight, _this.keyBinding[KeyMappingTypes.right]);
            _this.updateBindingButton(_this.els.bindingButtonShoot, _this.keyBinding[KeyMappingTypes.shoot]);
        };
        this.stopChangeKeyBindingListeners = function () {
            _this.documentEvents.removeListener("keydown");
            _this.documentEvents.removeListener("click");
        };
        this.onKeyDownNewBinding = function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (!_this.changeKeyMapping ||
                e.key === "Enter" ||
                e.key === "Escape" ||
                e.key === "Alt") {
                _this.closeChangeBindingPrompt();
                return;
            }
            _this.updateKeyBinding(_this.changeKeyMapping, e.key);
            _this.updateBindingButtons();
        };
        this.updateKeyBinding = function (keyMapping, newKey) {
            if (!_this.changeKeyMapping)
                return;
            _this.els.changeBindingText.insertText(_this.changeKeyMapping);
            _this.keyBinding.setKeyBinding[keyMapping](newKey);
            _this.updateBindingButton(_this.els.changeBindingButton, _this.keyBinding.keyBindings[_this.changeKeyMapping]);
        };
        this.openChangeBindingPrompt = function (changeKey, e) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                e.stopImmediatePropagation();
                this.changeKeyMapping = changeKey;
                this.documentEvents.addListener("keydown", this.onKeyDownNewBinding);
                this.documentEvents.addListener("click", this.closeChangeBindingPrompt);
                this.els.changeBindingText.insertText(changeKey);
                this.updateBindingButton(this.els.changeBindingButton, this.keyBinding.keyBindings[this.changeKeyMapping]);
                this.els.newKeyOverlay.show();
                return [2 /*return*/];
            });
        }); };
        this.closeChangeBindingPrompt = function () {
            var _a;
            _this.els.newKeyOverlay.hide();
            _this.changeKeyMapping = null;
            _this.stopChangeKeyBindingListeners();
            (_a = _this.els.enterNameInput.element) === null || _a === void 0 ? void 0 : _a.focus();
        };
        this.stopListeners = function () {
            Object.keys(_this.els).map(function (k) {
                return _this.els[k].removeAllListeners();
            });
        };
        this.onNameChange = function (e) {
            if (!(e.target && e.target.value.length > 16))
                _this.name = e.target.value;
            _this.els.enterNameInput.setValue(_this.name);
        };
        this.onStartGame = function () {
            if (!_this.name.length)
                return;
            _this.els.startGameButton.hide();
            _this.els.startGameLoader.show();
            _this.game.addLocalPlayer(_this.name);
        };
        this.onClickStartScreen = function (e) {
            var _a;
            if (!e.target)
                return;
            if (e.target === e.currentTarget)
                (_a = _this.els.enterNameInput.element) === null || _a === void 0 ? void 0 : _a.focus();
        };
        this.setupListeners = function () {
            _this.els.newKeyOverlay.addListener("click", _this.closeChangeBindingPrompt);
            _this.els.enterNameInput.addListener("input", _this.onNameChange);
            _this.els.startGameButton.addListener("click", _this.onStartGame);
            _this.els.startScreen.addListener("click", _this.onClickStartScreen);
            _this.els.bindingButtonUp.addListener("click", function (e) {
                return _this.openChangeBindingPrompt(KeyMappingTypes.up, e);
            });
            _this.els.bindingButtonDown.addListener("click", function (e) {
                return _this.openChangeBindingPrompt(KeyMappingTypes.down, e);
            });
            _this.els.bindingButtonLeft.addListener("click", function (e) {
                return _this.openChangeBindingPrompt(KeyMappingTypes.left, e);
            });
            _this.els.bindingButtonRight.addListener("click", function (e) {
                return _this.openChangeBindingPrompt(KeyMappingTypes.right, e);
            }),
                _this.els.bindingButtonShoot.addListener("click", function (e) {
                    return _this.openChangeBindingPrompt(KeyMappingTypes.shoot, e);
                });
        };
        this.close = function () {
            if (!_this.isOpen)
                return;
            _this.isOpen = false;
            _this.stopListeners();
            _this.changeKeyMapping = null;
            _this.els.startScreen.hide();
        };
        this.open = function () {
            var _a;
            if (!_this.els.startScreen || _this.isOpen)
                return;
            _this.isOpen = true;
            _this.els.startScreen.show();
            _this.setupListeners();
            (_a = _this.els.enterNameInput.element) === null || _a === void 0 ? void 0 : _a.focus();
        };
        this.game = game;
        this.keyBinding = keyBinding;
        this.name = "";
        this.changeKeyMapping = null;
        this.isOpen = false;
        this.els = {
            newKeyOverlay: new BetterElement("#change-binding-overlay", {
                hidden: true,
                visibleDisplay: "flex"
            }),
            changeBindingText: new BetterElement("#change-binding-text"),
            changeBindingButton: new BetterElement(".change-binding-button.change"),
            enterNameInput: new BetterElement("#enter-name-input"),
            startGameButton: new BetterElement("#start-game-button"),
            startGameLoader: new BetterElement("#start-game-loader"),
            startScreen: new BetterElement("#start-screen-container"),
            bindingButtonUp: new BetterElement(".change-binding-button.up"),
            bindingButtonDown: new BetterElement(".change-binding-button.down"),
            bindingButtonLeft: new BetterElement(".change-binding-button.left"),
            bindingButtonRight: new BetterElement(".change-binding-button.right"),
            bindingButtonShoot: new BetterElement(".change-binding-button.shoot")
        };
        this.updateBindingButtons();
        this.documentEvents = new BetterEvents(document);
        this.els.startScreen.hide();
        (_a = this.els.enterNameInput.element) === null || _a === void 0 ? void 0 : _a.focus();
    }
    return StartScreenComponent;
}());

var PlayerKeyBinding = /** @class */ (function () {
    function PlayerKeyBinding() {
        var _a, _b;
        var _this = this;
        this.setMoveUp = function (newKey) {
            if (newKey && !(typeof newKey === "string"))
                return;
            _this.up = newKey;
            _this.updateCurrentButtons();
        };
        this.setMoveDown = function (newKey) {
            if (newKey && !(typeof newKey === "string"))
                return;
            _this.down = newKey;
            _this.updateCurrentButtons();
        };
        this.setMoveRight = function (newKey) {
            if (newKey && !(typeof newKey === "string"))
                return;
            _this.right = newKey;
            _this.updateCurrentButtons();
        };
        this.setMoveLeft = function (newKey) {
            if (newKey && !(typeof newKey === "string"))
                return;
            _this.left = newKey;
            _this.updateCurrentButtons();
        };
        this.setShoot = function (newKey) {
            if (newKey && !(typeof newKey === "string"))
                return;
            _this.shoot = newKey;
            _this.updateCurrentButtons();
        };
        this.updateCurrentButtons = function () {
            var _a;
            _this.keyBindings = (_a = {},
                _a[KeyMappingTypes.up] = _this.up,
                _a[KeyMappingTypes.down] = _this.down,
                _a[KeyMappingTypes.left] = _this.left,
                _a[KeyMappingTypes.right] = _this.right,
                _a[KeyMappingTypes.shoot] = _this.shoot,
                _a);
            _this.saveKeybindings();
        };
        this.saveKeybindings = function () {
            localStorage.setItem(KeyMappingTypes.up, _this.up);
            localStorage.setItem(KeyMappingTypes.left, _this.left);
            localStorage.setItem(KeyMappingTypes.right, _this.right);
            localStorage.setItem(KeyMappingTypes.down, _this.down);
            localStorage.setItem(KeyMappingTypes.shoot, _this.shoot);
        };
        this.retriveKeybindings = function () {
            _this.up = localStorage.getItem(KeyMappingTypes.up) || primaryKeybinding.up;
            _this.left =
                localStorage.getItem(KeyMappingTypes.left) || primaryKeybinding.left;
            _this.down =
                localStorage.getItem(KeyMappingTypes.down) || primaryKeybinding.down;
            _this.right =
                localStorage.getItem(KeyMappingTypes.right) || primaryKeybinding.right;
            _this.shoot =
                localStorage.getItem(KeyMappingTypes.shoot) || primaryKeybinding.shoot;
        };
        this.up = primaryKeybinding.up;
        this.down = primaryKeybinding.down;
        this.right = primaryKeybinding.right;
        this.left = primaryKeybinding.left;
        this.shoot = primaryKeybinding.shoot;
        this.setKeyBinding = (_a = {},
            _a[KeyMappingTypes.up] = this.setMoveUp,
            _a[KeyMappingTypes.down] = this.setMoveDown,
            _a[KeyMappingTypes.left] = this.setMoveLeft,
            _a[KeyMappingTypes.right] = this.setMoveRight,
            _a[KeyMappingTypes.shoot] = this.setShoot,
            _a);
        this.keyBindings = (_b = {},
            _b[KeyMappingTypes.up] = this.up,
            _b[KeyMappingTypes.down] = this.down,
            _b[KeyMappingTypes.left] = this.left,
            _b[KeyMappingTypes.right] = this.right,
            _b[KeyMappingTypes.shoot] = this.shoot,
            _b);
        this.retriveKeybindings();
    }
    return PlayerKeyBinding;
}());

var GameLoop = /** @class */ (function () {
    function GameLoop(game, startScreen) {
        var _this = this;
        this.gameLoop = function () {
            if (!_this.game.localPlayer && !_this.startScreen.isOpen) {
                _this.startScreen.open();
            }
            else if (_this.startScreen.isOpen && _this.game.localPlayer) {
                _this.startScreen.close();
            }
            _this.game.update();
            window.requestAnimationFrame(_this.gameLoop);
        };
        this.game = game;
        this.startScreen = startScreen;
        window.requestAnimationFrame(this.gameLoop);
    }
    return GameLoop;
}());

var startGame = function (game) {
    if (!game.localPlayer)
        return;
    var isShoot = function () {
        var _a;
        if (!game || !((_a = game.localPlayer) === null || _a === void 0 ? void 0 : _a.gun.isShooting))
            return;
        // const { localPlayer, remotePlayers } = game
        // const localBullet = bulletElements.current[localPlayer.id]
        // if (!localBullet) return
        // const asyncCheckBulletHit = async () => {
        //   remotePlayers.forEach(remotePlayer => {
        //     if (remotePlayer.isDead || remotePlayer.hp <= 0) return
        //     const remoteDude = playerElements.current[remotePlayer.id]
        //     if (!isPlayerShoot(localBullet, remoteDude)) return
        //     // use this insted of calculating hp directly to not risk using old data
        //     game.socket.playerIsShoot(localPlayer.id, remotePlayer.id)
        //   })
        // }
        // asyncCheckBulletHit()
    };
    var loop = function () {
        isShoot();
    };
    var animationId = window.requestAnimationFrame(loop);
};
var setup = function () {
    console.log("runnig");
    var localPlayerId = getUserId() || generateAndGetUserId();
    var viewportEl = document.getElementById("player-viewport");
    var keyBinding = new PlayerKeyBinding();
    var game = new Game(localPlayerId, viewportEl, keyBinding);
    var startScreen = new StartScreenComponent(keyBinding, game);
    new GameLoop(game, startScreen);
    startGame(game);
};
setup();
