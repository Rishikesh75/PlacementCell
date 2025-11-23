/**
 * Resource Entity
 * Represents a study/preparation resource
 */

export class Resource {
  constructor(
    public category?: string,
    public description?: string,
    public link?: string
  ) {}

  /**
   * Validate if resource has required information
   */
  isValid(): boolean {
    return (
      (this.category?.trim() !== '' || false) &&
      (this.description?.trim() !== '' || false)
    );
  }

  /**
   * Check if resource has a link
   */
  hasLink(): boolean {
    return this.link !== undefined && this.link.trim() !== '';
  }
}

