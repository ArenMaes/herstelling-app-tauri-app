use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq)]
pub struct Project {
    pub project_id: i64,
    pub customer_name: String,
    pub plate: String,
    pub working_time_minutes: i64,
    pub archived: bool,
    pub created_at: DateTime<Utc>,
}
