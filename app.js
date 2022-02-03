fetch("https://api.datamuse.com/words?sp=?????&max=1000&md=d")
  .then((res) => res.json())
  .then((data) => {
    const newData = data.filter((d) => {
      return d.defs;
    });
    const random = Math.floor(Math.random() * newData.length);
    wordPrint(newData[random].word);
    defGet(
      newData[random].defs[0]
        .replace("n\t", "")
        .replace("adv\t", "")
        .replace("v\t", "")
        .replace("adj\t", "")
    );
  });
