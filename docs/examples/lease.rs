//! Original, dependency-free teaching specification. Not a scheduler or authority service.
//! A production implementation must perform these checks and acceptance in one transaction.

#[derive(Clone, Debug)]
struct Lease<'a> {
    job: &'a str,
    task: &'a str,
    worker: &'a str,
    epoch: u64,
    expires_at_ms: u64,
    input_digest: &'a str,
    running: bool,
}

#[derive(Clone, Debug)]
struct Receipt<'a> {
    job: &'a str,
    task: &'a str,
    worker: &'a str,
    epoch: u64,
    input_digest: &'a str,
}

fn eligible(lease: &Lease<'_>, receipt: &Receipt<'_>, now_ms: u64) -> Result<(), &'static str> {
    if !lease.running { return Err("task is not running"); }
    if now_ms >= lease.expires_at_ms { return Err("lease expired"); }
    if (lease.job, lease.task, lease.worker, lease.epoch)
        != (receipt.job, receipt.task, receipt.worker, receipt.epoch) {
        return Err("claim identity or epoch does not match");
    }
    if lease.input_digest != receipt.input_digest { return Err("input digest changed"); }
    Ok(())
}

fn parse_port(value: Option<&str>) -> Result<u16, &'static str> {
    match value {
        None => Ok(8080),
        Some(raw) => raw.parse::<u16>().ok().filter(|port| *port > 0)
            .ok_or("LAB_PORT must be an integer between 1 and 65535"),
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    fn fixtures() -> (Lease<'static>, Receipt<'static>) {
        (Lease { job: "job-1", task: "extract", worker: "worker-a", epoch: 2,
            expires_at_ms: 100, input_digest: "synthetic-input-v1", running: true },
         Receipt { job: "job-1", task: "extract", worker: "worker-a", epoch: 2,
            input_digest: "synthetic-input-v1" })
    }
    #[test] fn accepts_current_claim() {
        let (lease, receipt) = fixtures();
        assert_eq!(eligible(&lease, &receipt, 99), Ok(()));
    }
    #[test] fn rejects_old_attempt_even_with_same_worker_name() {
        let (lease, mut receipt) = fixtures(); receipt.epoch = 1;
        assert!(eligible(&lease, &receipt, 99).is_err());
    }
    #[test] fn expiry_is_exclusive_even_before_reclamation() {
        let (lease, receipt) = fixtures();
        assert_eq!(eligible(&lease, &receipt, 100), Err("lease expired"));
    }
    #[test] fn rejects_wrong_task() {
        let (lease, mut receipt) = fixtures(); receipt.task = "publish";
        assert!(eligible(&lease, &receipt, 99).is_err());
    }
    #[test] fn rejects_changed_input() {
        let (lease, mut receipt) = fixtures(); receipt.input_digest = "different-input";
        assert!(eligible(&lease, &receipt, 99).is_err());
    }
    #[test] fn rejects_non_running_task() {
        let (mut lease, receipt) = fixtures(); lease.running = false;
        assert!(eligible(&lease, &receipt, 99).is_err());
    }
    #[test] fn configuration_distinguishes_missing_from_invalid() {
        assert_eq!(parse_port(None), Ok(8080));
        assert_eq!(parse_port(Some("9000")), Ok(9000));
        for value in ["", "oops", "0", "65536", "-1"] {
            assert!(parse_port(Some(value)).is_err());
        }
    }
}
