export interface Message {
    mid: string;
    rmid?: string;
    to: string;
    from: string;
    via?: string;
    forward?: string;
    type?: string;
    version: string;
    priority?: string;
    timestamp: string;
    body?: any;
}
