// 下载文件
const response: any = {};
const blob = new Blob([response.data], { type: 'application/octet-stream' });
const link = document.createElement('a');
link.href = window.URL.createObjectURL(blob);
link.download = 'fileName.xlsx';
link.click();
window.URL.revokeObjectURL(link.href);