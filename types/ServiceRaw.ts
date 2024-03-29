export interface ServiceRaw {
  PK: {
    S: string
  }
  SK: {
    S: string
  }
  Category: {
    S: string
  }
  Description: {
    S: string
  }
  Address: {
    M: {
      City: {
        S: string
      }
      Street?: {
        S: string
      }
    }
  }
  ServiceName: {
    S: string
  }
  Website: {
    S: string
  }
  DateAdded: {
    S: string
  }
  ImgUrl: {
    S: string
  }
  Tags: {
    L: {
      S: string
    }[]
  }
}
