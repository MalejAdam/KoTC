export type ResponseType<T> = {
  code: number;
  data: T;
  message: string;
};
export class Connector {
  private apiKey: string;
  private baseUrl: string;
  private accountId: string;
  private headers: Record<string, string>;

  constructor(apiKey: string, baseUrl: string, accountId: string) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.accountId = accountId;
    this.headers = {
      "Content-Type": "application/json",
      Authorization: this.apiKey,
    };
  }

  async get<T>(url: string): Promise<ResponseType<T>> {
    try {
      const response = await fetch(
        `${this.baseUrl}/user/${this.accountId}${url}`,
        {
          method: "GET",
          headers: { ...this.headers },
        }
      );

      return await response.json();
    } catch (e) {
      console.error(e);
      throw new Error("Error in fetching data");
    }
  }

  async post<T>(url: string, data: unknown): Promise<ResponseType<T>> {
    const response = await fetch(
      `${this.baseUrl}/user/${this.accountId}${url}`,
      {
        method: "POST",
        headers: { ...this.headers },
        body: JSON.stringify(data),
      }
    );

    return response.json();
  }

  async put<T>(url: string, data: unknown): Promise<ResponseType<T>> {
    const response = await fetch(
      `${this.baseUrl}/user/${this.accountId}${url}`,
      {
        method: "PUT",
        headers: { ...this.headers },
        body: JSON.stringify(data),
      }
    );

    return response.json();
  }

  async patch<T>(url: string, data: unknown): Promise<ResponseType<T>> {
    const response = await fetch(
      `${this.baseUrl}/user/${this.accountId}${url}`,
      {
        method: "PATCH",
        headers: { ...this.headers },
        body: JSON.stringify(data),
      }
    );

    return response.json();
  }

  async delete<T>(url: string): Promise<ResponseType<T>> {
    const response = await fetch(
      `${this.baseUrl}/user/${this.accountId}${url}`,
      {
        method: "DELETE",
        headers: { ...this.headers },
      }
    );

    return response.json();
  }
}

export default Connector;
