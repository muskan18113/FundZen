// src/utils/categorizeTransaction.js
function categorizeTransaction(description) {
  const desc = description.toLowerCase();
  
  if (desc.includes('grocery') || desc.includes('supermarket') || desc.includes('food')) {
    return 'Food & Dining';
  }
  if (desc.includes('fuel') || desc.includes('petrol') || desc.includes('gas') || desc.includes('uber') || desc.includes('ola')) {
    return 'Transportation';
  }
  if (desc.includes('shop') || desc.includes('amazon') || desc.includes('flipkart') || desc.includes('mall')) {
    return 'Shopping';
  }
  if (desc.includes('movie') || desc.includes('entertainment') || desc.includes('netflix')) {
    return 'Entertainment';
  }
  if (desc.includes('medical') || desc.includes('hospital') || desc.includes('pharmacy')) {
    return 'Healthcare';
  }
  if (desc.includes('salary') || desc.includes('income')) {
    return 'Income';
  }
  
  return 'Other';
}

module.exports = { categorizeTransaction };