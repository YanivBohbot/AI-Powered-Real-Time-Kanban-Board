export class CardCreatedEvent {
  constructor(
    public readonly cardId: string,
    public readonly title: string,
    public readonly description: string | undefined,
  ) {}
}
