/**
 * Resource Entity
 * Represents a study/preparation resource
 */

export class Resource {
  constructor(
    public category: string,
    public Description: string,
    public link: string
  ) {}

  /**
   * ValiDate if resource has required information
   */
  isValid(): boolean {
    return (
      (this.category?.trim() !== '' || false) &&
      (this.Description?.trim() !== '' || false)
    );
  }

  /**
   * Check if resource has a link
   */
  hasLink(): boolean {
    return this.link !== undefined && this.link.trim() !== '';
  }
}

