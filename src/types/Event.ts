import { User } from "./User";

export type Event = {
    id: string; 
    name: string; 
    description: string; 
    location: string; 
    max_participants: number; 
    start_date: string; 
    end_date: string; 
    owner: User
    created_at: string; 
    updated_at: string; 
  };
  