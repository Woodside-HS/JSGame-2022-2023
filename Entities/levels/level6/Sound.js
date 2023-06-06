class Sound {
  constructor(context, url) {
    this.context = context;
    this.buffer = null;

    this.source = this.context.createBufferSource();

    this.loadSound(url);
  }

  loadSound(url) {
    fetch(url)
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => this.context.decodeAudioData(arrayBuffer))
      .then((audioBuffer) => {
        this.buffer = audioBuffer;
      });
  }

  play(pitch = 1.0, rate = 1.0) {
    this.source = this.context.createBufferSource();
    this.source.buffer = this.buffer;
    this.source.playbackRate.value = rate;
    this.source.detune.value = pitch * 100;
    this.source.connect(this.context.destination);
    this.source.start();
  }
}
