export const seedQuestions = [
  {
    id: 'q001',
    domain: 'Networking Concepts',
    question: 'Which layer of the OSI model is responsible for logical addressing and routing?',
    options: ['A. Data Link', 'B. Transport', 'C. Network', 'D. Session'],
    answer: 'C',
    explanation: `## Layer 3 — Network\nThe **Network layer** handles logical (IP) addressing and routing between networks. Routers operate at this layer.\n\n- **Data Link (L2)** — physical addressing (MAC), same-network delivery\n- **Transport (L4)** — end-to-end delivery, TCP/UDP\n- **Session (L5)** — manages sessions between applications`
  },
  {
    id: 'q002',
    domain: 'Network Security',
    question:
      'Which attack involves flooding a target with traffic from multiple sources to overwhelm it?',
    options: ['A. Man-in-the-middle', 'B. DDoS', 'C. SQL Injection', 'D. ARP Spoofing'],
    answer: 'B',
    explanation: `## DDoS — Distributed Denial of Service\nA **DDoS attack** uses many compromised machines (a botnet) to flood a target, exhausting its resources.\n\n- **MitM** — intercepts communication between two parties\n- **SQL Injection** — targets databases via malicious input\n- **ARP Spoofing** — links attacker's MAC to a legitimate IP on a local network`
  },
  {
    id: 'q003',
    domain: 'Network Troubleshooting',
    question: 'A user can ping by IP but not by hostname. What is the most likely cause?',
    options: [
      'A. Default gateway misconfigured',
      'B. DNS failure',
      'C. NIC driver issue',
      'D. Subnet mask incorrect'
    ],
    answer: 'B',
    explanation: `## DNS Failure\nIf IP pings work but hostnames fail, **name resolution is broken**. DNS is responsible for resolving hostnames to IPs.\n\n- **Default gateway** issues would break routing off the local subnet entirely\n- **NIC driver** issues would prevent all network communication\n- **Subnet mask** errors affect local vs remote routing, not name resolution`
  },
  {
    id: 'q004',
    domain: 'Networking Concepts',
    question: 'What is the default subnet mask for a Class B IP address?',
    options: ['A. 255.0.0.0', 'B. 255.255.0.0', 'C. 255.255.255.0', 'D. 255.255.255.128'],
    answer: 'B',
    explanation: `## Class B Subnet Mask\nClass B addresses range from **128.0.0.0 to 191.255.255.255** and use a default mask of **255.255.0.0 (/16)**.\n\n- **Class A (255.0.0.0)** — 1.0.0.0 to 126.255.255.255\n- **Class C (255.255.255.0)** — 192.0.0.0 to 223.255.255.255\n- **/25 (255.255.255.128)** — a subnet of Class C, not a default class mask`
  },
  {
    id: 'q005',
    domain: 'Network Implementation',
    question:
      'Which wireless standard operates exclusively in the 5 GHz band and supports speeds up to 3.5 Gbps?',
    options: ['A. 802.11b', 'B. 802.11g', 'C. 802.11ac', 'D. 802.11n'],
    answer: 'C',
    explanation: `## 802.11ac (Wi-Fi 5)\n**802.11ac** operates only in the **5 GHz** band with theoretical speeds up to ~3.5 Gbps using MU-MIMO and wider channels.\n\n- **802.11b** — 2.4 GHz only, max 11 Mbps\n- **802.11g** — 2.4 GHz only, max 54 Mbps\n- **802.11n** — dual band (2.4/5 GHz), max 600 Mbps`
  },
  {
    id: 'q006',
    domain: 'Network Operations',
    question: 'Which protocol uses port 161 and is commonly used for network device monitoring?',
    options: ['A. ICMP', 'B. SNMP', 'C. Syslog', 'D. NetFlow'],
    answer: 'B',
    explanation: `## SNMP — Simple Network Management Protocol\n**SNMP** uses UDP **port 161** (queries) and port 162 (traps) to monitor and manage network devices like routers, switches, and servers.\n\n- **ICMP** — ping/traceroute, no fixed application port\n- **Syslog** — UDP 514, sends log messages\n- **NetFlow** — traffic flow analysis, not a fixed standard monitoring port`
  },
  {
    id: 'q007',
    domain: 'Network Security',
    question:
      'Which security feature on a managed switch prevents unauthorized DHCP servers from responding to client requests?',
    options: [
      'A. Port security',
      'B. DHCP snooping',
      'C. Dynamic ARP Inspection',
      'D. 802.1X'
    ],
    answer: 'B',
    explanation: `## DHCP Snooping\n**DHCP snooping** is a switch feature that designates trusted and untrusted ports. Only trusted ports (typically uplinks to the real DHCP server) are allowed to send DHCP offers, blocking rogue DHCP servers.\n\n- **Port security** — limits MACs per port, doesn't address DHCP\n- **DAI** — validates ARP packets using the DHCP snooping table\n- **802.1X** — authentication framework, not DHCP-specific`
  },
  {
    id: 'q008',
    domain: 'Networking Concepts',
    question:
      'A company has the network 192.168.10.0/26. How many usable host addresses does this provide?',
    options: ['A. 30', 'B. 62', 'C. 126', 'D. 254'],
    answer: 'B',
    explanation: `## /26 Subnetting\nA **/26** mask means 26 network bits and **6 host bits**. Total addresses = 2^6 = 64. Subtract 2 (network + broadcast) = **62 usable hosts**.\n\n- **/27** = 30 usable\n- **/25** = 126 usable\n- **/24** = 254 usable\n\n**Memory tip:** Each slash adds a bit to the network, halving the host space.`
  },
  {
    id: 'q009',
    domain: 'Network Troubleshooting',
    question:
      'Which command displays the path packets take from source to destination, showing each hop?',
    options: ['A. ping', 'B. nslookup', 'C. traceroute / tracert', 'D. netstat'],
    answer: 'C',
    explanation: `## traceroute / tracert\n**traceroute** (Linux/macOS) and **tracert** (Windows) send packets with increasing TTL values to reveal each router hop between source and destination.\n\n- **ping** — tests connectivity to a single host, no path info\n- **nslookup** — queries DNS for name resolution\n- **netstat** — shows active connections and listening ports`
  },
  {
    id: 'q010',
    domain: 'Network Implementation',
    question: 'Which spanning tree port state forwards frames AND learns MAC addresses?',
    options: ['A. Blocking', 'B. Listening', 'C. Learning', 'D. Forwarding'],
    answer: 'D',
    explanation: `## STP — Forwarding State\nOnly the **Forwarding** state both learns MAC addresses AND forwards data frames. This is the normal operating state for designated and root ports.\n\n- **Blocking** — receives BPDUs only, no forwarding or learning\n- **Listening** — processes BPDUs, no forwarding or learning\n- **Learning** — builds MAC table but does NOT yet forward frames`
  },
  {
    id: 'q011',
    domain: 'Network Operations',
    question: 'What does RPO stand for in the context of disaster recovery?',
    options: [
      'A. Recovery Point Objective',
      'B. Recovery Process Order',
      'C. Redundant Path Operation',
      'D. Recovery Priority Option'
    ],
    answer: 'A',
    explanation: `## RPO — Recovery Point Objective\n**RPO** defines the maximum acceptable amount of data loss measured in time — i.e., how old can the most recent backup be and still be acceptable?\n\n**RTO** (Recovery Time Objective) is the related term defining how quickly systems must be restored.\n\n- **RPO = data loss tolerance** (backup frequency)\n- **RTO = downtime tolerance** (how fast to recover)`
  },
  {
    id: 'q012',
    domain: 'Network Security',
    question:
      'An attacker sends unsolicited Bluetooth connections to a nearby device to extract data. What is this attack called?',
    options: ['A. Bluesnarfing', 'B. Bluejacking', 'C. Evil twin', 'D. Deauth attack'],
    answer: 'A',
    explanation: `## Bluesnarfing\n**Bluesnarfing** is unauthorized access to a device via Bluetooth to steal data (contacts, messages, etc.).\n\n- **Bluejacking** — sending unsolicited messages via Bluetooth (annoying, not data theft)\n- **Evil twin** — rogue Wi-Fi AP mimicking a legitimate one\n- **Deauth attack** — forcing Wi-Fi clients to disconnect (Wi-Fi, not Bluetooth)`
  },
  {
    id: 'q013',
    domain: 'Networking Concepts',
    question: 'Which IPv6 address type is equivalent to IPv4 private addresses (RFC 1918)?',
    options: [
      'A. Link-local (fe80::/10)',
      'B. Unique local (fc00::/7)',
      'C. Multicast (ff00::/8)',
      'D. Global unicast (2000::/3)'
    ],
    answer: 'B',
    explanation: `## Unique Local Addresses\n**Unique local addresses (fc00::/7)** are IPv6's equivalent of RFC 1918 private space — routable within an organization but not on the global internet.\n\n- **Link-local (fe80::/10)** — auto-configured, single link only (like APIPA 169.254.x.x)\n- **Multicast (ff00::/8)** — one-to-many delivery\n- **Global unicast** — publicly routable IPv6 (like public IPv4)`
  },
  {
    id: 'q014',
    domain: 'Network Troubleshooting',
    question:
      'A network cable passes through a ceiling near fluorescent lights and users report intermittent connectivity. What is the most likely cause?',
    options: [
      'A. Crosstalk between cable pairs',
      'B. Electromagnetic interference (EMI)',
      'C. Incorrect cable category',
      'D. Cable too long'
    ],
    answer: 'B',
    explanation: `## Electromagnetic Interference\nFluorescent lights emit **EMI** that can corrupt signals on nearby copper cables. STP (shielded twisted pair) or rerouting the cable resolves this.\n\n- **Crosstalk** — interference between pairs within the same cable, not from external sources\n- **Wrong category** — would cause consistent degradation, not intermittent issues near lights\n- **Cable length** — over 100m causes consistent signal degradation, not proximity-based issues`
  },
  {
    id: 'q015',
    domain: 'Network Implementation',
    question:
      'Which protocol provides default gateway redundancy by allowing multiple routers to share a virtual IP address?',
    options: ['A. STP', 'B. OSPF', 'C. HSRP', 'D. LACP'],
    answer: 'C',
    explanation: `## HSRP — Hot Standby Router Protocol\n**HSRP** (Cisco proprietary) allows multiple routers to present a single virtual IP/MAC as the default gateway. One router is active, others are standby.\n\n- **VRRP** is the open-standard equivalent of HSRP\n- **STP** — prevents Layer 2 loops, not gateway redundancy\n- **OSPF** — dynamic routing protocol\n- **LACP** — link aggregation (bundles physical ports)`
  }
];

export const domains = [
  'Networking Concepts',
  'Network Implementation',
  'Network Operations',
  'Network Security',
  'Network Troubleshooting'
];
