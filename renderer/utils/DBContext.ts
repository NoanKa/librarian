import { Low } from "lowdb/lib";
import { JSONFile } from 'lowdb/node'


export const db = new Low(new JSONFile('../db/file.json'), {})