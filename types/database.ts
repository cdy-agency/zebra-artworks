export type UserRole = 'admin' | 'editor' | 'viewer';

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];


  export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          created_at: string;
          email: string;
          full_name: string;
          id: string;
          role: UserRole;
        };
        Insert: {
          created_at?: string;
          email: string;
          full_name: string;
          id: string;
          role?: UserRole;
        };
        Update: {
          created_at?: string;
          email?: string;
          full_name?: string;
          id?: string;
          role?: UserRole;
        };
        Relationships: [];
      };

      // ✅ CONTACT / MESSAGES TABLE (phonenumber added)
      messages: {
        Row: {
          id: number;
          name: string;
          email: string;
          phonenumber: string | null;
          message: string;
          created_at: string;
          read: boolean;
        };
        Insert: {
          id?: number;
          name: string;
          email: string;
          phonenumber?: string | null;
          message: string;
          created_at?: string;
          read: boolean;
        };
        Update: {
          id?: number;
          name?: string;
          email?: string;
          phonenumber?: string | null;
          message?: string;
          created_at?: string;
          read?: boolean;
        };
        Relationships: [];
      };
    };

    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
