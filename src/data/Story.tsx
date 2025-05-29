export type Story = {
  story_id: string;
  user_id: string;
  media_url: string;
  status: boolean;
  createAt: Date;
  expires_at: Date;
};

export default Story;