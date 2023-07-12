export interface Services {
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
  ServiceID: {
    S: string
  }
}
