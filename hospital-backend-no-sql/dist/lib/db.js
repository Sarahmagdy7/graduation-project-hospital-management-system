"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const path_1 = __importDefault(require("path"));
const dbPath = path_1.default.join(__dirname, '..', '..', 'hospital.db');
// Connect to SQLite database
const sqliteDb = new sqlite3_1.default.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening SQLite database:', err.message);
    }
    else {
        console.log('Connected to local SQLite database at:', dbPath);
    }
});
exports.db = {
    query: (text, params = []) => {
        // Convert PostgreSQL style parameters ($1, $2...) to SQLite style (?)
        const sqliteSql = text.replace(/\$(\d+)/g, '?');
        // Check if it's an INSERT/UPDATE/DELETE or SELECT
        const isMutation = /^\s*(INSERT|UPDATE|DELETE)/i.test(sqliteSql);
        return new Promise((resolve, reject) => {
            if (isMutation) {
                // For mutations, we use run to get lastID if needed
                sqliteDb.run(sqliteSql, params, function (err) {
                    if (err) {
                        console.error('SQLite mutation error:', err.message, 'SQL:', sqliteSql);
                        reject(err);
                    }
                    else {
                        // If the original query had "RETURNING id", we mimic it
                        if (/RETURNING id/i.test(text)) {
                            resolve([{ id: this.lastID }]);
                        }
                        else {
                            resolve([]);
                        }
                    }
                });
            }
            else {
                // For SELECT queries
                sqliteDb.all(sqliteSql, params, (err, rows) => {
                    if (err) {
                        console.error('SQLite query error:', err.message, 'SQL:', sqliteSql);
                        reject(err);
                    }
                    else {
                        resolve(rows);
                    }
                });
            }
        });
    },
    exec: (text) => {
        return new Promise((resolve, reject) => {
            sqliteDb.exec(text, (err) => {
                if (err)
                    reject(err);
                else
                    resolve();
            });
        });
    }
};
