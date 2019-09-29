export class make {
    make_id: String;
    make_name: String;
    make_status: String;
  }

export class model {
  model_id: String;
  model_make_name: String;
  model_name: String;
  model_status: String;
}

export class category {
  category_id: Number;
  category_name: String;
  category_status: String;
  
}

export class type {
  type_id: Number;
  type_category_name: String;
  type_name: String;
  code_pattern: String;
  configuration_type: String;
  type_status: String;
  
}

export class location {
  location_code: String;
  location_name: String;
  location_status: String;
}

export class branch {
  branch_id: Number;
  branch_name: String;
  branch_code: String;
  branch_status: String;
}

export class employee {
  employee_no: String;
  employee_name: String;
  employee_type: String;
  designation: String;
  company: String;
  employee_branch: String;
  employee_status: String;
  username: String;
  password: String;
  token: String;
  user_role: String;
}

export class asset {
  asset_category: String;
  asset_type: String;
  asset_serial: String;
  asset_barcode: String;
  asset_name: String;
  asset_classification: String;
  asset_location: String;
  asset_owner_IT: String;
  asset_branch: String;
  asset_owner_branch: String;
  asset_company: String;
  asset_code: String;
  asset_make: String;
  asset_model: String;
  asset_status: String;
  processor: String;
  RAM: String;
  hard_disk: String;
  display: String;
  os: String;
  installed_sw: String;
  description: String;
}

export class ticket {
  ticket_no: String;
  asset_serial: String;
  identified_issue: String;
  criticality_rating: String;
  ticket_branch: String;
  authorized_person: String;
  sender: String;
  sender_name: String;
  received_by: String;
  received_by_name: String;
  ticket_status: String;
  tracking_status: String;
  ticket_create_date: Date;
  ticket_received_date: Date;
  ticket_closing_comment: String;
  ticket_closing_date: Date;

}

export class job {
  jobNo: String;
  ticket_no: String;
  inspection_comment: String;
  repairing_method: String;
  jobCreated_by: String;
  job_status: String;
  job_create_date: Date;
  vendor_selected: String;
  vendor_comment: String;
  vendor_send_date: Date;
  quotation_no: String;
  quotation_refNo: String;
  quotation_amount: String;
  quotation_date: Date;
  quotation_description: String;
  quotation_attachment: String;
  quotation_approved_date: Date;
  quotation_approvedBy: String;
  bill_no: String;
  payment_amount: String;
  payment_date: Date;
  payment_description: String;
  payment_attachment: String;
  vendor_receive_date: Date;
  vendor_rating: String;
  vendor_receive_comment: String;
  inhouse_closing_comment: String;
  purchased_date: Date;
  warranty_period: String;


}

export class vendor {
  vendor_code: String;
  vendor_name: String;
  vendor_address: String;
  vendor_contact_no1: String;
  vendor_contact_no2: String;
  vendor_email: String;
  contact_person: String;
  telephone_no: String;
  mobile_no: String;
  email: String;
  vendor_status: String;

}

export class log {
  log_type: String;
  log_id: String;
  log_date: Date;
  log_status: String;
  log_comment: String;


}

export class agreement {
  agreement_no: String;
  vendor: String;
  agreement_name: String;
  agreement_type: String;
  agreement_category: String;
  start_date: Date;
  renewal_period: String;
  end_date: Date;
  agreement_status: String;
  vendor_rating: String;
  agreement_comment: String;

}

export class VendorRating {
  vendor: String;
  comment: String;
  vendor_rating: String;
  create_date: Date;

}

export class AgreementRenewal {
  agreement_no: String;
  renew_date: Date;
  new_end_date: Date;
  vendor_rating: String;
  comment: String;

}

export class activityLog {
  activity: String;
  create_by: String;
  create_date: Date;

}

export class assetAuditTrail {
  asset_code: String;
  asset_serial: String;
  asset_barcode: String;
  action: String;
  create_by: String;
  create_date: Date;
  create_by_name: String;

}