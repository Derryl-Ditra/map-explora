# Skill: Dependency-Guard (Security Auditor)
Source: oss-security/dependency-guard

## Purpose
Scans for abandoned projects or recent malware injections (CVE/RCE detection). Blocks any third-party import that does not meet the "Verified Giant" criteria.

## Core Instructions
1. **Giant-Only Policy**: Only permit dependencies from verified, major technology organizations (Google, Meta, Microsoft, Vercel, Amazon).
2. **Malware/CVE Detection**: Scan all imports for active CVE reports or history of supply-chain attacks.
3. **Automated Blocking**: Proactively block any code ingestion that fails the security track record check.
4. **Minimal Surface Area**: Align with Caveman Mode to ensure that even "Giant" libraries are only used when absolutely necessary.

## Logic Rules
- Reject any package with a history of RCE or persistent vulnerabilities.
- Prefer custom implementations over small, unverified utilities.
