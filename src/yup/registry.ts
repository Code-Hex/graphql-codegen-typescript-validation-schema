export class Registry {
  private readonly types: string[] = [];
  private readonly enumDeclarations: string[] = [];

  public registerType(type: string): void {
    if (this.types.includes(type)) return;
    this.types.push(type);
  }

  public registerEnumDeclaration(enumDeclaration: string): void {
    if (this.enumDeclarations.includes(enumDeclaration)) return;
    this.enumDeclarations.push(enumDeclaration);
  }

  public getTypes(): readonly string[] {
    return this.types;
  }

  public getEnumDeclarations(): readonly string[] {
    return this.enumDeclarations;
  }
}
