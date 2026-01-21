export class CreateBoardDto {
  title: string;
  workspaceId: string; // We need to know which workspace this board belongs to
}
