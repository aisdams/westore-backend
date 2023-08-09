export const parseCsv = (dataCsv: { buffer: any; }) => {
    function parse(text: string) {
      const csvExp =
        /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|"([^""]*(?:"[\S\s][^""]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
  
      const values = [];
  
      text.replace(csvExp, (m0, m1, m2, m3, m4) => {
        if (m1 !== undefined) {
          values.push(m1.replace(/\\'/g, "'"));
        } else if (m2 !== undefined) {
          values.push(m2.replace(/\\"/g, '"'));
        } else if (m3 !== undefined) {
          values.push(m3.replace(/""/g, '"'));
        } else if (m4 !== undefined) {
          values.push(m4);
        }
        return "";
      });
  
      if (/,\s*$/.test(text)) {
        values.push("");
      }
  
      return values;
    }
  
    let buffer = dataCsv.buffer;
    let data = buffer
      .toString()
      .split("\n")
      .map((e: string) => e.trim())
      .map((e: string) => parse(e).map((e) => e.trim()));
  
    return data;
  };
  