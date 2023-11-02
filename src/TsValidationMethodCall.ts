export class TsValidationMethodCall {
  /**
   * @param methodName
   * @param codifiedArgs そのままコードに埋め込まれるため、文字列等はJSON.stringify済であること
   */
  public constructor(
    private methodName: string,
    private codifiedArgs: string[]
  ) {}

  public toString(): string {
    return `.${this.methodName}(${this.codifiedArgs.join(',')})`;
  }
}
