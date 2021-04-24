class GmapService {
  constructor() {
    this.gmaps = [];
  }

  add(id, gmap) {
    this.gmaps.push({ id: id, gmap: gmap });
  }

  get(id) {
    return this.gmaps.find(d => d.id === id);
  }
}

const gmapService = new GmapService();
Object.freeze(gmapService);
export default gmapService;
