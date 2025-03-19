export interface DiaryEntry {
    id: string,
    date: string,
    weather: string,
    visibility: string,
    comment: string
};

export interface EntriesProps {
    entries: DiaryEntry[]
}

export interface NewEntryProps {
    newEntries: newDiaryEntry,
    setNewEntries: React.Dispatch<React.SetStateAction<newDiaryEntry>>,
    setEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>
    entries: DiaryEntry[]
}

export interface ErrorMessage {
    message: string,
    received?: string
}

export type newDiaryEntry = Omit<DiaryEntry, "id">;