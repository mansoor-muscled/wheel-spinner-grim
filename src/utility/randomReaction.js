function randomReaction() {
  const reactions = ["dancing", "shocked", "laughing"];
  return reactions[Math.floor(Math.random() * reactions.length)];
}

export default randomReaction;
