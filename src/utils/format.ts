export default function format(
  value: number | string | undefined,
  precision?: number
): string {
  switch (typeof value) {
    case 'undefined':
      return 'N/A';
    case 'string':
      return value;
    case 'number':
      return Number.parseFloat(value.toFixed(precision ?? 0))
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }
}
