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
  return {
    href: blobUrl,
    download: `${data.length}_item${data.length > 1 ? 's' : ''}.csv`,
  };
};
