import axios from "axios";
import { DiaryEntry, newDiaryEntry } from "../types";

const baseUrl = 'http://localhost:3000/api/diaries'

export const getAllEntries = async () => {
    return axios
        .get<DiaryEntry[]>(baseUrl)
        .then(response => response.data)
}

export const createDiaryEntry = async (object: newDiaryEntry) => {
    return axios
        .post<DiaryEntry>(baseUrl, object)
        .then(response => response.data)
}