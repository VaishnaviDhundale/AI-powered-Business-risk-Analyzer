// Utility functions

export const getSeverityColor = (severity) => {
  const colors = {
    'Low': '#10b981',      // Green
    'Medium': '#f59e0b',   // Amber
    'High': '#ef4444',     // Red
    'Critical': '#7c2d12'  // Dark Red
  };
  return colors[severity] || '#6b7280';
};

export const getSeverityBgColor = (severity) => {
  const colors = {
    'Low': '#ecfdf5',
    'Medium': '#fffbeb',
    'High': '#fef2f2',
    'Critical': '#7c2d12'
  };
  return colors[severity] || '#f3f4f6';
};

export const calculateAverageScore = (scores) => {
  if (!scores || scores.length === 0) return 0;
  return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
};

export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

export const generatePDF = async (content, filename) => {
  // Simplified PDF export - just copy to clipboard and show message
  // For production, use a proper library like jsPDF
  const element = document.createElement('div');
  element.innerHTML = content;
  const text = element.innerText;
  
  try {
    await navigator.clipboard.writeText(text);
    alert('Report copied to clipboard! You can paste it into your preferred document editor.');
  } catch (err) {
    console.error('Failed to copy:', err);
  }
};

export const downloadAsJSON = (data, filename) => {
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2)));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

export const downloadAsCSV = (data, filename) => {
  let csv = 'Category,Risk Title,Severity,Risk Score,Mitigation\n';
  
  if (data.categories && Array.isArray(data.categories)) {
    data.categories.forEach(category => {
      if (category.risks && Array.isArray(category.risks)) {
        category.risks.forEach(risk => {
          csv += `"${category.category_name}","${risk.risk_title}","${risk.severity}",${risk.risk_score},"${risk.mitigation_strategy.replace(/"/g, '""')}"\n`;
        });
      }
    });
  }
  
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};
