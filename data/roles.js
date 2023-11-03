const roles = {
    // 'user':['Dashboard'],
    'SUPERADMIN': ['Dashboard', 'Approvals', 'Receipts', 'Payroll'],
    'MANAGER': ['Dashboard',            
                 'Receipts'],
    'SALES': ['Dashboard','OnBoard Form'],
  };
export default roles;