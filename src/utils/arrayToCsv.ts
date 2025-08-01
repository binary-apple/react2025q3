const arrayToString = (data: object[]): string => {
  if (!data.length) {
    return '';
  }

  const rows: string[] = [];
  rows.push(Object.keys(data[0]).join(';'));

  data.forEach((value) => {
    rows.push(Object.values(value).join(';'));
  });

  return rows.join('\n');
};

export const saveToCsv = (data: object[]) => {
  const blob = new Blob([arrayToString(data)], {
    type: 'text/csv',
  });

  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = `${data.length}_item${data.length > 1 ? 's' : ''}.csv`;

  link.click();
};
