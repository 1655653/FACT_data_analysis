function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 0.3, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
      }
    }
  });
}





var heatmap_data = [
    {
      "cpe_name": "BusyBox 1.13.0 (CRITICAL)",
      "cve_count": 0,
      "base_score": 1,
      "exploitability_score": 1,
      "impact_score": 1,
      "all_cve_objects_bs": [],
      "all_cve_objects_es": [
        {
          "cve_code": "CVE-2015-9261",
          "base_score": "5.5",
          "impact_score": "3.6",
          "exploitability_score": "1.8",
          "attackVector": "LOCAL",
          "baseSeverity": "MEDIUM",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "huft_build in archival/libarchive/decompress_gunzip.c in BusyBox before 1.27.2 misuses a pointer, causing segfaults and an application crash during an unzip operation on a specially crafted ZIP file."
        },
        {
          "cve_code": "CVE-2014-9645",
          "base_score": "5.5",
          "impact_score": "3.6",
          "exploitability_score": "1.8",
          "attackVector": "LOCAL",
          "baseSeverity": "MEDIUM",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "The add_probe function in modutils/modprobe.c in BusyBox before 1.23.0 allows local users to bypass intended restrictions on loading kernel modules via a / (slash) character in a module name, as demonstrated by an \"ifconfig /usbserial up\" command or a \"mount -t /snd_pcm none /\" command."
        }
      ],
      "all_cve_objects_is": [],
      "uid_affected": [
        "8e42d5d3def2f34038d05f00664936c8ac0d99bbfb94cfd89cb7e80e75b87d66_134644"
      ],
      "hid_affected": [
        "/bin/busybox"
      ]
    },
    {
      "cpe_name": "BusyBox 1.13.0 (CRITICAL)",
      "cve_count": 0,
      "base_score": 2,
      "exploitability_score": 2,
      "impact_score": 2,
      "all_cve_objects_bs": [],
      "all_cve_objects_es": [
        {
          "cve_code": "CVE-2017-16544",
          "base_score": "8.8",
          "impact_score": "5.9",
          "exploitability_score": "2.8",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "In the add_match function in libbb/lineedit.c in BusyBox through 1.27.2, the tab autocomplete feature of the shell, used to get a list of filenames in a directory, does not sanitize filenames and results in executing any escape sequence in the terminal. This could potentially result in code execution, arbitrary file writes, or other attacks."
        },
        {
          "cve_code": "CVE-2018-1000500",
          "base_score": "8.1",
          "impact_score": "5.9",
          "exploitability_score": "2.2",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "HIGH",
          "version": "4.0",
          "description": "Busybox contains a Missing SSL certificate validation vulnerability in The \"busybox wget\" applet that can result in arbitrary code execution. This attack appear to be exploitable via Simply download any file over HTTPS using \"busybox wget https://compromised-domain.com/important-file\"."
        }
      ],
      "all_cve_objects_is": [],
      "uid_affected": [
        "8e42d5d3def2f34038d05f00664936c8ac0d99bbfb94cfd89cb7e80e75b87d66_134644"
      ],
      "hid_affected": [
        "/bin/busybox"
      ]
    },
    {
      "cpe_name": "BusyBox 1.13.0 (CRITICAL)",
      "cve_count": 0,
      "base_score": 3,
      "exploitability_score": 3,
      "impact_score": 3,
      "all_cve_objects_bs": [],
      "all_cve_objects_es": [
        {
          "cve_code": "CVE-2016-2148",
          "base_score": "9.8",
          "impact_score": "5.9",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "CRITICAL",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "Heap-based buffer overflow in the DHCP client (udhcpc) in BusyBox before 1.25.0 allows remote attackers to have unspecified impact via vectors involving OPTION_6RD parsing."
        },
        {
          "cve_code": "CVE-2011-5325",
          "base_score": "7.5",
          "impact_score": "3.6",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "Directory traversal vulnerability in the BusyBox implementation of tar before 1.22.0 v5 allows remote attackers to point to files outside the current working directory via a symlink."
        },
        {
          "cve_code": "CVE-2016-2147",
          "base_score": "7.5",
          "impact_score": "3.6",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "Integer overflow in the DHCP client (udhcpc) in BusyBox before 1.25.0 allows remote attackers to cause a denial of service (crash) via a malformed RFC1035-encoded domain name, which triggers an out-of-bounds heap write."
        },
        {
          "cve_code": "CVE-2018-1000517",
          "base_score": "9.8",
          "impact_score": "5.9",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "CRITICAL",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "BusyBox project BusyBox wget version prior to commit 8e2174e9bd836e53c8b9c6e00d1bc6e2a718686e contains a Buffer Overflow vulnerability in Busybox wget that can result in heap buffer overflow. This attack appear to be exploitable via network connectivity. This vulnerability appears to have been fixed in after commit 8e2174e9bd836e53c8b9c6e00d1bc6e2a718686e."
        },
        {
          "cve_code": "CVE-2016-6301",
          "base_score": "7.5",
          "impact_score": "3.6",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "The recv_and_process_client_pkt function in networking/ntpd.c in busybox allows remote attackers to cause a denial of service (CPU and bandwidth consumption) via a forged NTP packet, which triggers a communication loop."
        },
        {
          "cve_code": "CVE-2013-1813",
          "base_score": "7.2",
          "impact_score": "10",
          "exploitability_score": "3.9",
          "version": "4.0",
          "description": "util-linux/mdev.c in BusyBox before 1.21.0 uses 0777 permissions for parent directories when creating nested directories under /dev/, which allows local users to have unknown impact and attack vectors."
        },
        {
          "cve_code": "CVE-2011-2716",
          "base_score": "6.8",
          "impact_score": "10",
          "exploitability_score": "3.2",
          "version": "4.0",
          "description": "The DHCP client (udhcpc) in BusyBox before 1.20.0 allows remote DHCP servers to execute arbitrary commands via shell metacharacters in the (1) HOST_NAME, (2) DOMAIN_NAME, (3) NIS_DOMAIN, and (4) TFTP_SERVER_NAME host name options."
        },
        {
          "cve_code": "CVE-2019-5747",
          "base_score": "7.5",
          "impact_score": "3.6",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "An issue was discovered in BusyBox through 1.30.0. An out of bounds read in udhcp components (consumed by the DHCP server, client, and/or relay) might allow a remote attacker to leak sensitive information from the stack by sending a crafted DHCP message. This is related to assurance of a 4-byte length when decoding DHCP_SUBNET. NOTE: this issue exists because of an incomplete fix for CVE-2018-20679."
        },
        {
          "cve_code": "CVE-2018-20679",
          "base_score": "7.5",
          "impact_score": "3.6",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "An issue was discovered in BusyBox before 1.30.0. An out of bounds read in udhcp components (consumed by the DHCP server, client, and relay) allows a remote attacker to leak sensitive information from the stack by sending a crafted DHCP message. This is related to verification in udhcp_get_option() in networking/udhcp/common.c that 4-byte options are indeed 4 bytes."
        }
      ],
      "all_cve_objects_is": [
        {
          "cve_code": "CVE-2015-9261",
          "base_score": "5.5",
          "impact_score": "3.6",
          "exploitability_score": "1.8",
          "attackVector": "LOCAL",
          "baseSeverity": "MEDIUM",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "huft_build in archival/libarchive/decompress_gunzip.c in BusyBox before 1.27.2 misuses a pointer, causing segfaults and an application crash during an unzip operation on a specially crafted ZIP file."
        },
        {
          "cve_code": "CVE-2011-5325",
          "base_score": "7.5",
          "impact_score": "3.6",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "Directory traversal vulnerability in the BusyBox implementation of tar before 1.22.0 v5 allows remote attackers to point to files outside the current working directory via a symlink."
        },
        {
          "cve_code": "CVE-2016-2147",
          "base_score": "7.5",
          "impact_score": "3.6",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "Integer overflow in the DHCP client (udhcpc) in BusyBox before 1.25.0 allows remote attackers to cause a denial of service (crash) via a malformed RFC1035-encoded domain name, which triggers an out-of-bounds heap write."
        },
        {
          "cve_code": "CVE-2016-6301",
          "base_score": "7.5",
          "impact_score": "3.6",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "The recv_and_process_client_pkt function in networking/ntpd.c in busybox allows remote attackers to cause a denial of service (CPU and bandwidth consumption) via a forged NTP packet, which triggers a communication loop."
        },
        {
          "cve_code": "CVE-2019-5747",
          "base_score": "7.5",
          "impact_score": "3.6",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "An issue was discovered in BusyBox through 1.30.0. An out of bounds read in udhcp components (consumed by the DHCP server, client, and/or relay) might allow a remote attacker to leak sensitive information from the stack by sending a crafted DHCP message. This is related to assurance of a 4-byte length when decoding DHCP_SUBNET. NOTE: this issue exists because of an incomplete fix for CVE-2018-20679."
        },
        {
          "cve_code": "CVE-2018-20679",
          "base_score": "7.5",
          "impact_score": "3.6",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "An issue was discovered in BusyBox before 1.30.0. An out of bounds read in udhcp components (consumed by the DHCP server, client, and relay) allows a remote attacker to leak sensitive information from the stack by sending a crafted DHCP message. This is related to verification in udhcp_get_option() in networking/udhcp/common.c that 4-byte options are indeed 4 bytes."
        },
        {
          "cve_code": "CVE-2014-9645",
          "base_score": "5.5",
          "impact_score": "3.6",
          "exploitability_score": "1.8",
          "attackVector": "LOCAL",
          "baseSeverity": "MEDIUM",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "The add_probe function in modutils/modprobe.c in BusyBox before 1.23.0 allows local users to bypass intended restrictions on loading kernel modules via a / (slash) character in a module name, as demonstrated by an \"ifconfig /usbserial up\" command or a \"mount -t /snd_pcm none /\" command."
        }
      ],
      "uid_affected": [
        "8e42d5d3def2f34038d05f00664936c8ac0d99bbfb94cfd89cb7e80e75b87d66_134644"
      ],
      "hid_affected": [
        "/bin/busybox"
      ]
    },
    {
      "cpe_name": "BusyBox 1.13.0 (CRITICAL)",
      "cve_count": 0,
      "base_score": 4,
      "exploitability_score": 4,
      "impact_score": 4,
      "all_cve_objects_bs": [],
      "all_cve_objects_es": [],
      "all_cve_objects_is": [],
      "uid_affected": [
        "8e42d5d3def2f34038d05f00664936c8ac0d99bbfb94cfd89cb7e80e75b87d66_134644"
      ],
      "hid_affected": [
        "/bin/busybox"
      ]
    },
    {
      "cpe_name": "BusyBox 1.13.0 (CRITICAL)",
      "cve_count": 0,
      "base_score": 5,
      "exploitability_score": 5,
      "impact_score": 5,
      "all_cve_objects_bs": [
        {
          "cve_code": "CVE-2015-9261",
          "base_score": "5.5",
          "impact_score": "3.6",
          "exploitability_score": "1.8",
          "attackVector": "LOCAL",
          "baseSeverity": "MEDIUM",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "huft_build in archival/libarchive/decompress_gunzip.c in BusyBox before 1.27.2 misuses a pointer, causing segfaults and an application crash during an unzip operation on a specially crafted ZIP file."
        },
        {
          "cve_code": "CVE-2014-9645",
          "base_score": "5.5",
          "impact_score": "3.6",
          "exploitability_score": "1.8",
          "attackVector": "LOCAL",
          "baseSeverity": "MEDIUM",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "The add_probe function in modutils/modprobe.c in BusyBox before 1.23.0 allows local users to bypass intended restrictions on loading kernel modules via a / (slash) character in a module name, as demonstrated by an \"ifconfig /usbserial up\" command or a \"mount -t /snd_pcm none /\" command."
        }
      ],
      "all_cve_objects_es": [],
      "all_cve_objects_is": [
        {
          "cve_code": "CVE-2017-16544",
          "base_score": "8.8",
          "impact_score": "5.9",
          "exploitability_score": "2.8",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "In the add_match function in libbb/lineedit.c in BusyBox through 1.27.2, the tab autocomplete feature of the shell, used to get a list of filenames in a directory, does not sanitize filenames and results in executing any escape sequence in the terminal. This could potentially result in code execution, arbitrary file writes, or other attacks."
        },
        {
          "cve_code": "CVE-2016-2148",
          "base_score": "9.8",
          "impact_score": "5.9",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "CRITICAL",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "Heap-based buffer overflow in the DHCP client (udhcpc) in BusyBox before 1.25.0 allows remote attackers to have unspecified impact via vectors involving OPTION_6RD parsing."
        },
        {
          "cve_code": "CVE-2018-1000517",
          "base_score": "9.8",
          "impact_score": "5.9",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "CRITICAL",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "BusyBox project BusyBox wget version prior to commit 8e2174e9bd836e53c8b9c6e00d1bc6e2a718686e contains a Buffer Overflow vulnerability in Busybox wget that can result in heap buffer overflow. This attack appear to be exploitable via network connectivity. This vulnerability appears to have been fixed in after commit 8e2174e9bd836e53c8b9c6e00d1bc6e2a718686e."
        },
        {
          "cve_code": "CVE-2018-1000500",
          "base_score": "8.1",
          "impact_score": "5.9",
          "exploitability_score": "2.2",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "HIGH",
          "version": "4.0",
          "description": "Busybox contains a Missing SSL certificate validation vulnerability in The \"busybox wget\" applet that can result in arbitrary code execution. This attack appear to be exploitable via Simply download any file over HTTPS using \"busybox wget https://compromised-domain.com/important-file\"."
        }
      ],
      "uid_affected": [
        "8e42d5d3def2f34038d05f00664936c8ac0d99bbfb94cfd89cb7e80e75b87d66_134644"
      ],
      "hid_affected": [
        "/bin/busybox"
      ]
    },
    {
      "cpe_name": "BusyBox 1.13.0 (CRITICAL)",
      "cve_count": 0,
      "base_score": 6,
      "exploitability_score": 6,
      "impact_score": 6,
      "all_cve_objects_bs": [
        {
          "cve_code": "CVE-2011-2716",
          "base_score": "6.8",
          "impact_score": "10",
          "exploitability_score": "3.2",
          "version": "4.0",
          "description": "The DHCP client (udhcpc) in BusyBox before 1.20.0 allows remote DHCP servers to execute arbitrary commands via shell metacharacters in the (1) HOST_NAME, (2) DOMAIN_NAME, (3) NIS_DOMAIN, and (4) TFTP_SERVER_NAME host name options."
        }
      ],
      "all_cve_objects_es": [],
      "all_cve_objects_is": [],
      "uid_affected": [
        "8e42d5d3def2f34038d05f00664936c8ac0d99bbfb94cfd89cb7e80e75b87d66_134644"
      ],
      "hid_affected": [
        "/bin/busybox"
      ]
    },
    {
      "cpe_name": "BusyBox 1.13.0 (CRITICAL)",
      "cve_count": 0,
      "base_score": 7,
      "exploitability_score": 7,
      "impact_score": 7,
      "all_cve_objects_bs": [
        {
          "cve_code": "CVE-2011-5325",
          "base_score": "7.5",
          "impact_score": "3.6",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "Directory traversal vulnerability in the BusyBox implementation of tar before 1.22.0 v5 allows remote attackers to point to files outside the current working directory via a symlink."
        },
        {
          "cve_code": "CVE-2016-2147",
          "base_score": "7.5",
          "impact_score": "3.6",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "Integer overflow in the DHCP client (udhcpc) in BusyBox before 1.25.0 allows remote attackers to cause a denial of service (crash) via a malformed RFC1035-encoded domain name, which triggers an out-of-bounds heap write."
        },
        {
          "cve_code": "CVE-2016-6301",
          "base_score": "7.5",
          "impact_score": "3.6",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "The recv_and_process_client_pkt function in networking/ntpd.c in busybox allows remote attackers to cause a denial of service (CPU and bandwidth consumption) via a forged NTP packet, which triggers a communication loop."
        },
        {
          "cve_code": "CVE-2013-1813",
          "base_score": "7.2",
          "impact_score": "10",
          "exploitability_score": "3.9",
          "version": "4.0",
          "description": "util-linux/mdev.c in BusyBox before 1.21.0 uses 0777 permissions for parent directories when creating nested directories under /dev/, which allows local users to have unknown impact and attack vectors."
        },
        {
          "cve_code": "CVE-2019-5747",
          "base_score": "7.5",
          "impact_score": "3.6",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "An issue was discovered in BusyBox through 1.30.0. An out of bounds read in udhcp components (consumed by the DHCP server, client, and/or relay) might allow a remote attacker to leak sensitive information from the stack by sending a crafted DHCP message. This is related to assurance of a 4-byte length when decoding DHCP_SUBNET. NOTE: this issue exists because of an incomplete fix for CVE-2018-20679."
        },
        {
          "cve_code": "CVE-2018-20679",
          "base_score": "7.5",
          "impact_score": "3.6",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "An issue was discovered in BusyBox before 1.30.0. An out of bounds read in udhcp components (consumed by the DHCP server, client, and relay) allows a remote attacker to leak sensitive information from the stack by sending a crafted DHCP message. This is related to verification in udhcp_get_option() in networking/udhcp/common.c that 4-byte options are indeed 4 bytes."
        }
      ],
      "all_cve_objects_es": [],
      "all_cve_objects_is": [],
      "uid_affected": [
        "8e42d5d3def2f34038d05f00664936c8ac0d99bbfb94cfd89cb7e80e75b87d66_134644"
      ],
      "hid_affected": [
        "/bin/busybox"
      ]
    },
    {
      "cpe_name": "BusyBox 1.13.0 (CRITICAL)",
      "cve_count": 0,
      "base_score": 8,
      "exploitability_score": 8,
      "impact_score": 8,
      "all_cve_objects_bs": [
        {
          "cve_code": "CVE-2017-16544",
          "base_score": "8.8",
          "impact_score": "5.9",
          "exploitability_score": "2.8",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "In the add_match function in libbb/lineedit.c in BusyBox through 1.27.2, the tab autocomplete feature of the shell, used to get a list of filenames in a directory, does not sanitize filenames and results in executing any escape sequence in the terminal. This could potentially result in code execution, arbitrary file writes, or other attacks."
        },
        {
          "cve_code": "CVE-2018-1000500",
          "base_score": "8.1",
          "impact_score": "5.9",
          "exploitability_score": "2.2",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "HIGH",
          "version": "4.0",
          "description": "Busybox contains a Missing SSL certificate validation vulnerability in The \"busybox wget\" applet that can result in arbitrary code execution. This attack appear to be exploitable via Simply download any file over HTTPS using \"busybox wget https://compromised-domain.com/important-file\"."
        }
      ],
      "all_cve_objects_es": [],
      "all_cve_objects_is": [],
      "uid_affected": [
        "8e42d5d3def2f34038d05f00664936c8ac0d99bbfb94cfd89cb7e80e75b87d66_134644"
      ],
      "hid_affected": [
        "/bin/busybox"
      ]
    },
    {
      "cpe_name": "BusyBox 1.13.0 (CRITICAL)",
      "cve_count": 0,
      "base_score": 9,
      "exploitability_score": 9,
      "impact_score": 9,
      "all_cve_objects_bs": [
        {
          "cve_code": "CVE-2016-2148",
          "base_score": "9.8",
          "impact_score": "5.9",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "CRITICAL",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "Heap-based buffer overflow in the DHCP client (udhcpc) in BusyBox before 1.25.0 allows remote attackers to have unspecified impact via vectors involving OPTION_6RD parsing."
        },
        {
          "cve_code": "CVE-2018-1000517",
          "base_score": "9.8",
          "impact_score": "5.9",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "CRITICAL",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "BusyBox project BusyBox wget version prior to commit 8e2174e9bd836e53c8b9c6e00d1bc6e2a718686e contains a Buffer Overflow vulnerability in Busybox wget that can result in heap buffer overflow. This attack appear to be exploitable via network connectivity. This vulnerability appears to have been fixed in after commit 8e2174e9bd836e53c8b9c6e00d1bc6e2a718686e."
        }
      ],
      "all_cve_objects_es": [],
      "all_cve_objects_is": [],
      "uid_affected": [
        "8e42d5d3def2f34038d05f00664936c8ac0d99bbfb94cfd89cb7e80e75b87d66_134644"
      ],
      "hid_affected": [
        "/bin/busybox"
      ]
    },
    {
      "cpe_name": "BusyBox 1.13.0 (CRITICAL)",
      "cve_count": 0,
      "base_score": 10,
      "exploitability_score": 10,
      "impact_score": 10,
      "all_cve_objects_bs": [],
      "all_cve_objects_es": [],
      "all_cve_objects_is": [
        {
          "cve_code": "CVE-2013-1813",
          "base_score": "7.2",
          "impact_score": "10",
          "exploitability_score": "3.9",
          "version": "4.0",
          "description": "util-linux/mdev.c in BusyBox before 1.21.0 uses 0777 permissions for parent directories when creating nested directories under /dev/, which allows local users to have unknown impact and attack vectors."
        },
        {
          "cve_code": "CVE-2011-2716",
          "base_score": "6.8",
          "impact_score": "10",
          "exploitability_score": "3.2",
          "version": "4.0",
          "description": "The DHCP client (udhcpc) in BusyBox before 1.20.0 allows remote DHCP servers to execute arbitrary commands via shell metacharacters in the (1) HOST_NAME, (2) DOMAIN_NAME, (3) NIS_DOMAIN, and (4) TFTP_SERVER_NAME host name options."
        }
      ],
      "uid_affected": [
        "8e42d5d3def2f34038d05f00664936c8ac0d99bbfb94cfd89cb7e80e75b87d66_134644"
      ],
      "hid_affected": [
        "/bin/busybox"
      ]
    },
    {
      "cpe_name": "BusyBox 1.7.2 (CRITICAL)",
      "cve_count": 0,
      "base_score": 1,
      "exploitability_score": 1,
      "impact_score": 1,
      "all_cve_objects_bs": [],
      "all_cve_objects_es": [
        {
          "cve_code": "CVE-2015-9261",
          "base_score": "5.5",
          "impact_score": "3.6",
          "exploitability_score": "1.8",
          "attackVector": "LOCAL",
          "baseSeverity": "MEDIUM",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "huft_build in archival/libarchive/decompress_gunzip.c in BusyBox before 1.27.2 misuses a pointer, causing segfaults and an application crash during an unzip operation on a specially crafted ZIP file."
        },
        {
          "cve_code": "CVE-2014-9645",
          "base_score": "5.5",
          "impact_score": "3.6",
          "exploitability_score": "1.8",
          "attackVector": "LOCAL",
          "baseSeverity": "MEDIUM",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "The add_probe function in modutils/modprobe.c in BusyBox before 1.23.0 allows local users to bypass intended restrictions on loading kernel modules via a / (slash) character in a module name, as demonstrated by an \"ifconfig /usbserial up\" command or a \"mount -t /snd_pcm none /\" command."
        }
      ],
      "all_cve_objects_is": [],
      "uid_affected": [
        "ef3ab616a0bee3b579177e162462419407a79f84a88ff3b55f45716c7668f0ba_353680",
        "e416f574eb870c0ec8ef2491d968e1d1000038f7a8fe12801fb79a1464ec4574_301368"
      ],
      "hid_affected": [
        "/sbin/traceroute",
        "/bin/sleep"
      ]
    },
    {
      "cpe_name": "BusyBox 1.7.2 (CRITICAL)",
      "cve_count": 0,
      "base_score": 2,
      "exploitability_score": 2,
      "impact_score": 2,
      "all_cve_objects_bs": [],
      "all_cve_objects_es": [
        {
          "cve_code": "CVE-2017-16544",
          "base_score": "8.8",
          "impact_score": "5.9",
          "exploitability_score": "2.8",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "In the add_match function in libbb/lineedit.c in BusyBox through 1.27.2, the tab autocomplete feature of the shell, used to get a list of filenames in a directory, does not sanitize filenames and results in executing any escape sequence in the terminal. This could potentially result in code execution, arbitrary file writes, or other attacks."
        },
        {
          "cve_code": "CVE-2018-1000500",
          "base_score": "8.1",
          "impact_score": "5.9",
          "exploitability_score": "2.2",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "HIGH",
          "version": "4.0",
          "description": "Busybox contains a Missing SSL certificate validation vulnerability in The \"busybox wget\" applet that can result in arbitrary code execution. This attack appear to be exploitable via Simply download any file over HTTPS using \"busybox wget https://compromised-domain.com/important-file\"."
        }
      ],
      "all_cve_objects_is": [],
      "uid_affected": [
        "ef3ab616a0bee3b579177e162462419407a79f84a88ff3b55f45716c7668f0ba_353680",
        "e416f574eb870c0ec8ef2491d968e1d1000038f7a8fe12801fb79a1464ec4574_301368"
      ],
      "hid_affected": [
        "/sbin/traceroute",
        "/bin/sleep"
      ]
    },
    {
      "cpe_name": "BusyBox 1.7.2 (CRITICAL)",
      "cve_count": 0,
      "base_score": 3,
      "exploitability_score": 3,
      "impact_score": 3,
      "all_cve_objects_bs": [],
      "all_cve_objects_es": [
        {
          "cve_code": "CVE-2016-2148",
          "base_score": "9.8",
          "impact_score": "5.9",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "CRITICAL",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "Heap-based buffer overflow in the DHCP client (udhcpc) in BusyBox before 1.25.0 allows remote attackers to have unspecified impact via vectors involving OPTION_6RD parsing."
        },
        {
          "cve_code": "CVE-2011-5325",
          "base_score": "7.5",
          "impact_score": "3.6",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "Directory traversal vulnerability in the BusyBox implementation of tar before 1.22.0 v5 allows remote attackers to point to files outside the current working directory via a symlink."
        },
        {
          "cve_code": "CVE-2016-2147",
          "base_score": "7.5",
          "impact_score": "3.6",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "Integer overflow in the DHCP client (udhcpc) in BusyBox before 1.25.0 allows remote attackers to cause a denial of service (crash) via a malformed RFC1035-encoded domain name, which triggers an out-of-bounds heap write."
        },
        {
          "cve_code": "CVE-2018-1000517",
          "base_score": "9.8",
          "impact_score": "5.9",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "CRITICAL",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "BusyBox project BusyBox wget version prior to commit 8e2174e9bd836e53c8b9c6e00d1bc6e2a718686e contains a Buffer Overflow vulnerability in Busybox wget that can result in heap buffer overflow. This attack appear to be exploitable via network connectivity. This vulnerability appears to have been fixed in after commit 8e2174e9bd836e53c8b9c6e00d1bc6e2a718686e."
        },
        {
          "cve_code": "CVE-2016-6301",
          "base_score": "7.5",
          "impact_score": "3.6",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "The recv_and_process_client_pkt function in networking/ntpd.c in busybox allows remote attackers to cause a denial of service (CPU and bandwidth consumption) via a forged NTP packet, which triggers a communication loop."
        },
        {
          "cve_code": "CVE-2013-1813",
          "base_score": "7.2",
          "impact_score": "10",
          "exploitability_score": "3.9",
          "version": "4.0",
          "description": "util-linux/mdev.c in BusyBox before 1.21.0 uses 0777 permissions for parent directories when creating nested directories under /dev/, which allows local users to have unknown impact and attack vectors."
        },
        {
          "cve_code": "CVE-2011-2716",
          "base_score": "6.8",
          "impact_score": "10",
          "exploitability_score": "3.2",
          "version": "4.0",
          "description": "The DHCP client (udhcpc) in BusyBox before 1.20.0 allows remote DHCP servers to execute arbitrary commands via shell metacharacters in the (1) HOST_NAME, (2) DOMAIN_NAME, (3) NIS_DOMAIN, and (4) TFTP_SERVER_NAME host name options."
        },
        {
          "cve_code": "CVE-2019-5747",
          "base_score": "7.5",
          "impact_score": "3.6",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "An issue was discovered in BusyBox through 1.30.0. An out of bounds read in udhcp components (consumed by the DHCP server, client, and/or relay) might allow a remote attacker to leak sensitive information from the stack by sending a crafted DHCP message. This is related to assurance of a 4-byte length when decoding DHCP_SUBNET. NOTE: this issue exists because of an incomplete fix for CVE-2018-20679."
        },
        {
          "cve_code": "CVE-2018-20679",
          "base_score": "7.5",
          "impact_score": "3.6",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "An issue was discovered in BusyBox before 1.30.0. An out of bounds read in udhcp components (consumed by the DHCP server, client, and relay) allows a remote attacker to leak sensitive information from the stack by sending a crafted DHCP message. This is related to verification in udhcp_get_option() in networking/udhcp/common.c that 4-byte options are indeed 4 bytes."
        }
      ],
      "all_cve_objects_is": [
        {
          "cve_code": "CVE-2015-9261",
          "base_score": "5.5",
          "impact_score": "3.6",
          "exploitability_score": "1.8",
          "attackVector": "LOCAL",
          "baseSeverity": "MEDIUM",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "huft_build in archival/libarchive/decompress_gunzip.c in BusyBox before 1.27.2 misuses a pointer, causing segfaults and an application crash during an unzip operation on a specially crafted ZIP file."
        },
        {
          "cve_code": "CVE-2011-5325",
          "base_score": "7.5",
          "impact_score": "3.6",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "Directory traversal vulnerability in the BusyBox implementation of tar before 1.22.0 v5 allows remote attackers to point to files outside the current working directory via a symlink."
        },
        {
          "cve_code": "CVE-2016-2147",
          "base_score": "7.5",
          "impact_score": "3.6",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "Integer overflow in the DHCP client (udhcpc) in BusyBox before 1.25.0 allows remote attackers to cause a denial of service (crash) via a malformed RFC1035-encoded domain name, which triggers an out-of-bounds heap write."
        },
        {
          "cve_code": "CVE-2016-6301",
          "base_score": "7.5",
          "impact_score": "3.6",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "The recv_and_process_client_pkt function in networking/ntpd.c in busybox allows remote attackers to cause a denial of service (CPU and bandwidth consumption) via a forged NTP packet, which triggers a communication loop."
        },
        {
          "cve_code": "CVE-2019-5747",
          "base_score": "7.5",
          "impact_score": "3.6",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "An issue was discovered in BusyBox through 1.30.0. An out of bounds read in udhcp components (consumed by the DHCP server, client, and/or relay) might allow a remote attacker to leak sensitive information from the stack by sending a crafted DHCP message. This is related to assurance of a 4-byte length when decoding DHCP_SUBNET. NOTE: this issue exists because of an incomplete fix for CVE-2018-20679."
        },
        {
          "cve_code": "CVE-2018-20679",
          "base_score": "7.5",
          "impact_score": "3.6",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "An issue was discovered in BusyBox before 1.30.0. An out of bounds read in udhcp components (consumed by the DHCP server, client, and relay) allows a remote attacker to leak sensitive information from the stack by sending a crafted DHCP message. This is related to verification in udhcp_get_option() in networking/udhcp/common.c that 4-byte options are indeed 4 bytes."
        },
        {
          "cve_code": "CVE-2014-9645",
          "base_score": "5.5",
          "impact_score": "3.6",
          "exploitability_score": "1.8",
          "attackVector": "LOCAL",
          "baseSeverity": "MEDIUM",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "The add_probe function in modutils/modprobe.c in BusyBox before 1.23.0 allows local users to bypass intended restrictions on loading kernel modules via a / (slash) character in a module name, as demonstrated by an \"ifconfig /usbserial up\" command or a \"mount -t /snd_pcm none /\" command."
        }
      ],
      "uid_affected": [
        "ef3ab616a0bee3b579177e162462419407a79f84a88ff3b55f45716c7668f0ba_353680",
        "e416f574eb870c0ec8ef2491d968e1d1000038f7a8fe12801fb79a1464ec4574_301368"
      ],
      "hid_affected": [
        "/sbin/traceroute",
        "/bin/sleep"
      ]
    },
    {
      "cpe_name": "BusyBox 1.7.2 (CRITICAL)",
      "cve_count": 0,
      "base_score": 4,
      "exploitability_score": 4,
      "impact_score": 4,
      "all_cve_objects_bs": [],
      "all_cve_objects_es": [],
      "all_cve_objects_is": [],
      "uid_affected": [
        "ef3ab616a0bee3b579177e162462419407a79f84a88ff3b55f45716c7668f0ba_353680",
        "e416f574eb870c0ec8ef2491d968e1d1000038f7a8fe12801fb79a1464ec4574_301368"
      ],
      "hid_affected": [
        "/sbin/traceroute",
        "/bin/sleep"
      ]
    },
    {
      "cpe_name": "BusyBox 1.7.2 (CRITICAL)",
      "cve_count": 0,
      "base_score": 5,
      "exploitability_score": 5,
      "impact_score": 5,
      "all_cve_objects_bs": [
        {
          "cve_code": "CVE-2015-9261",
          "base_score": "5.5",
          "impact_score": "3.6",
          "exploitability_score": "1.8",
          "attackVector": "LOCAL",
          "baseSeverity": "MEDIUM",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "huft_build in archival/libarchive/decompress_gunzip.c in BusyBox before 1.27.2 misuses a pointer, causing segfaults and an application crash during an unzip operation on a specially crafted ZIP file."
        },
        {
          "cve_code": "CVE-2014-9645",
          "base_score": "5.5",
          "impact_score": "3.6",
          "exploitability_score": "1.8",
          "attackVector": "LOCAL",
          "baseSeverity": "MEDIUM",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "The add_probe function in modutils/modprobe.c in BusyBox before 1.23.0 allows local users to bypass intended restrictions on loading kernel modules via a / (slash) character in a module name, as demonstrated by an \"ifconfig /usbserial up\" command or a \"mount -t /snd_pcm none /\" command."
        }
      ],
      "all_cve_objects_es": [],
      "all_cve_objects_is": [
        {
          "cve_code": "CVE-2017-16544",
          "base_score": "8.8",
          "impact_score": "5.9",
          "exploitability_score": "2.8",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "In the add_match function in libbb/lineedit.c in BusyBox through 1.27.2, the tab autocomplete feature of the shell, used to get a list of filenames in a directory, does not sanitize filenames and results in executing any escape sequence in the terminal. This could potentially result in code execution, arbitrary file writes, or other attacks."
        },
        {
          "cve_code": "CVE-2016-2148",
          "base_score": "9.8",
          "impact_score": "5.9",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "CRITICAL",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "Heap-based buffer overflow in the DHCP client (udhcpc) in BusyBox before 1.25.0 allows remote attackers to have unspecified impact via vectors involving OPTION_6RD parsing."
        },
        {
          "cve_code": "CVE-2018-1000517",
          "base_score": "9.8",
          "impact_score": "5.9",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "CRITICAL",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "BusyBox project BusyBox wget version prior to commit 8e2174e9bd836e53c8b9c6e00d1bc6e2a718686e contains a Buffer Overflow vulnerability in Busybox wget that can result in heap buffer overflow. This attack appear to be exploitable via network connectivity. This vulnerability appears to have been fixed in after commit 8e2174e9bd836e53c8b9c6e00d1bc6e2a718686e."
        },
        {
          "cve_code": "CVE-2018-1000500",
          "base_score": "8.1",
          "impact_score": "5.9",
          "exploitability_score": "2.2",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "HIGH",
          "version": "4.0",
          "description": "Busybox contains a Missing SSL certificate validation vulnerability in The \"busybox wget\" applet that can result in arbitrary code execution. This attack appear to be exploitable via Simply download any file over HTTPS using \"busybox wget https://compromised-domain.com/important-file\"."
        }
      ],
      "uid_affected": [
        "ef3ab616a0bee3b579177e162462419407a79f84a88ff3b55f45716c7668f0ba_353680",
        "e416f574eb870c0ec8ef2491d968e1d1000038f7a8fe12801fb79a1464ec4574_301368"
      ],
      "hid_affected": [
        "/sbin/traceroute",
        "/bin/sleep"
      ]
    },
    {
      "cpe_name": "BusyBox 1.7.2 (CRITICAL)",
      "cve_count": 0,
      "base_score": 6,
      "exploitability_score": 6,
      "impact_score": 6,
      "all_cve_objects_bs": [
        {
          "cve_code": "CVE-2011-2716",
          "base_score": "6.8",
          "impact_score": "10",
          "exploitability_score": "3.2",
          "version": "4.0",
          "description": "The DHCP client (udhcpc) in BusyBox before 1.20.0 allows remote DHCP servers to execute arbitrary commands via shell metacharacters in the (1) HOST_NAME, (2) DOMAIN_NAME, (3) NIS_DOMAIN, and (4) TFTP_SERVER_NAME host name options."
        }
      ],
      "all_cve_objects_es": [],
      "all_cve_objects_is": [],
      "uid_affected": [
        "ef3ab616a0bee3b579177e162462419407a79f84a88ff3b55f45716c7668f0ba_353680",
        "e416f574eb870c0ec8ef2491d968e1d1000038f7a8fe12801fb79a1464ec4574_301368"
      ],
      "hid_affected": [
        "/sbin/traceroute",
        "/bin/sleep"
      ]
    },
    {
      "cpe_name": "BusyBox 1.7.2 (CRITICAL)",
      "cve_count": 0,
      "base_score": 7,
      "exploitability_score": 7,
      "impact_score": 7,
      "all_cve_objects_bs": [
        {
          "cve_code": "CVE-2011-5325",
          "base_score": "7.5",
          "impact_score": "3.6",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "Directory traversal vulnerability in the BusyBox implementation of tar before 1.22.0 v5 allows remote attackers to point to files outside the current working directory via a symlink."
        },
        {
          "cve_code": "CVE-2016-2147",
          "base_score": "7.5",
          "impact_score": "3.6",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "Integer overflow in the DHCP client (udhcpc) in BusyBox before 1.25.0 allows remote attackers to cause a denial of service (crash) via a malformed RFC1035-encoded domain name, which triggers an out-of-bounds heap write."
        },
        {
          "cve_code": "CVE-2016-6301",
          "base_score": "7.5",
          "impact_score": "3.6",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "The recv_and_process_client_pkt function in networking/ntpd.c in busybox allows remote attackers to cause a denial of service (CPU and bandwidth consumption) via a forged NTP packet, which triggers a communication loop."
        },
        {
          "cve_code": "CVE-2013-1813",
          "base_score": "7.2",
          "impact_score": "10",
          "exploitability_score": "3.9",
          "version": "4.0",
          "description": "util-linux/mdev.c in BusyBox before 1.21.0 uses 0777 permissions for parent directories when creating nested directories under /dev/, which allows local users to have unknown impact and attack vectors."
        },
        {
          "cve_code": "CVE-2019-5747",
          "base_score": "7.5",
          "impact_score": "3.6",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "An issue was discovered in BusyBox through 1.30.0. An out of bounds read in udhcp components (consumed by the DHCP server, client, and/or relay) might allow a remote attacker to leak sensitive information from the stack by sending a crafted DHCP message. This is related to assurance of a 4-byte length when decoding DHCP_SUBNET. NOTE: this issue exists because of an incomplete fix for CVE-2018-20679."
        },
        {
          "cve_code": "CVE-2018-20679",
          "base_score": "7.5",
          "impact_score": "3.6",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "An issue was discovered in BusyBox before 1.30.0. An out of bounds read in udhcp components (consumed by the DHCP server, client, and relay) allows a remote attacker to leak sensitive information from the stack by sending a crafted DHCP message. This is related to verification in udhcp_get_option() in networking/udhcp/common.c that 4-byte options are indeed 4 bytes."
        }
      ],
      "all_cve_objects_es": [],
      "all_cve_objects_is": [],
      "uid_affected": [
        "ef3ab616a0bee3b579177e162462419407a79f84a88ff3b55f45716c7668f0ba_353680",
        "e416f574eb870c0ec8ef2491d968e1d1000038f7a8fe12801fb79a1464ec4574_301368"
      ],
      "hid_affected": [
        "/sbin/traceroute",
        "/bin/sleep"
      ]
    },
    {
      "cpe_name": "BusyBox 1.7.2 (CRITICAL)",
      "cve_count": 0,
      "base_score": 8,
      "exploitability_score": 8,
      "impact_score": 8,
      "all_cve_objects_bs": [
        {
          "cve_code": "CVE-2017-16544",
          "base_score": "8.8",
          "impact_score": "5.9",
          "exploitability_score": "2.8",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "In the add_match function in libbb/lineedit.c in BusyBox through 1.27.2, the tab autocomplete feature of the shell, used to get a list of filenames in a directory, does not sanitize filenames and results in executing any escape sequence in the terminal. This could potentially result in code execution, arbitrary file writes, or other attacks."
        },
        {
          "cve_code": "CVE-2018-1000500",
          "base_score": "8.1",
          "impact_score": "5.9",
          "exploitability_score": "2.2",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "HIGH",
          "version": "4.0",
          "description": "Busybox contains a Missing SSL certificate validation vulnerability in The \"busybox wget\" applet that can result in arbitrary code execution. This attack appear to be exploitable via Simply download any file over HTTPS using \"busybox wget https://compromised-domain.com/important-file\"."
        }
      ],
      "all_cve_objects_es": [],
      "all_cve_objects_is": [],
      "uid_affected": [
        "ef3ab616a0bee3b579177e162462419407a79f84a88ff3b55f45716c7668f0ba_353680",
        "e416f574eb870c0ec8ef2491d968e1d1000038f7a8fe12801fb79a1464ec4574_301368"
      ],
      "hid_affected": [
        "/sbin/traceroute",
        "/bin/sleep"
      ]
    },
    {
      "cpe_name": "BusyBox 1.7.2 (CRITICAL)",
      "cve_count": 0,
      "base_score": 9,
      "exploitability_score": 9,
      "impact_score": 9,
      "all_cve_objects_bs": [
        {
          "cve_code": "CVE-2016-2148",
          "base_score": "9.8",
          "impact_score": "5.9",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "CRITICAL",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "Heap-based buffer overflow in the DHCP client (udhcpc) in BusyBox before 1.25.0 allows remote attackers to have unspecified impact via vectors involving OPTION_6RD parsing."
        },
        {
          "cve_code": "CVE-2018-1000517",
          "base_score": "9.8",
          "impact_score": "5.9",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "CRITICAL",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "BusyBox project BusyBox wget version prior to commit 8e2174e9bd836e53c8b9c6e00d1bc6e2a718686e contains a Buffer Overflow vulnerability in Busybox wget that can result in heap buffer overflow. This attack appear to be exploitable via network connectivity. This vulnerability appears to have been fixed in after commit 8e2174e9bd836e53c8b9c6e00d1bc6e2a718686e."
        }
      ],
      "all_cve_objects_es": [],
      "all_cve_objects_is": [],
      "uid_affected": [
        "ef3ab616a0bee3b579177e162462419407a79f84a88ff3b55f45716c7668f0ba_353680",
        "e416f574eb870c0ec8ef2491d968e1d1000038f7a8fe12801fb79a1464ec4574_301368"
      ],
      "hid_affected": [
        "/sbin/traceroute",
        "/bin/sleep"
      ]
    },
    {
      "cpe_name": "BusyBox 1.7.2 (CRITICAL)",
      "cve_count": 0,
      "base_score": 10,
      "exploitability_score": 10,
      "impact_score": 10,
      "all_cve_objects_bs": [],
      "all_cve_objects_es": [],
      "all_cve_objects_is": [
        {
          "cve_code": "CVE-2013-1813",
          "base_score": "7.2",
          "impact_score": "10",
          "exploitability_score": "3.9",
          "version": "4.0",
          "description": "util-linux/mdev.c in BusyBox before 1.21.0 uses 0777 permissions for parent directories when creating nested directories under /dev/, which allows local users to have unknown impact and attack vectors."
        },
        {
          "cve_code": "CVE-2011-2716",
          "base_score": "6.8",
          "impact_score": "10",
          "exploitability_score": "3.2",
          "version": "4.0",
          "description": "The DHCP client (udhcpc) in BusyBox before 1.20.0 allows remote DHCP servers to execute arbitrary commands via shell metacharacters in the (1) HOST_NAME, (2) DOMAIN_NAME, (3) NIS_DOMAIN, and (4) TFTP_SERVER_NAME host name options."
        }
      ],
      "uid_affected": [
        "ef3ab616a0bee3b579177e162462419407a79f84a88ff3b55f45716c7668f0ba_353680",
        "e416f574eb870c0ec8ef2491d968e1d1000038f7a8fe12801fb79a1464ec4574_301368"
      ],
      "hid_affected": [
        "/sbin/traceroute",
        "/bin/sleep"
      ]
    },
    {
      "cpe_name": "Dnsmasq 2.52 (CRITICAL)",
      "cve_count": 0,
      "base_score": 1,
      "exploitability_score": 1,
      "impact_score": 1,
      "all_cve_objects_bs": [],
      "all_cve_objects_es": [],
      "all_cve_objects_is": [
        {
          "cve_code": "CVE-2021-3448",
          "base_score": "4",
          "impact_score": "1.4",
          "exploitability_score": "2.2",
          "attackVector": "NETWORK",
          "baseSeverity": "MEDIUM",
          "attackComplexity": "HIGH",
          "version": "4.0",
          "description": "A flaw was found in dnsmasq in versions before 2.85. When configured to use a specific server for a given network interface, dnsmasq uses a fixed port while forwarding queries. An attacker on the network, able to find the outgoing port used by dnsmasq, only needs to guess the random transmission ID to forge a reply and get it accepted by dnsmasq. This flaw makes a DNS Cache Poisoning attack much easier. The highest threat from this vulnerability is to data integrity."
        },
        {
          "cve_code": "CVE-2020-25684",
          "base_score": "3.7",
          "impact_score": "1.4",
          "exploitability_score": "2.2",
          "attackVector": "NETWORK",
          "baseSeverity": "LOW",
          "attackComplexity": "HIGH",
          "version": "4.0",
          "description": "A flaw was found in dnsmasq before version 2.83. When getting a reply from a forwarded query, dnsmasq checks in the forward.c:reply_query() if the reply destination address/port is used by the pending forwarded queries. However, it does not use the address/port to retrieve the exact forwarded query, substantially reducing the number of attempts an attacker on the network would have to perform to forge a reply and get it accepted by dnsmasq. This issue contrasts with RFC5452, which specifies a query's attributes that all must be used to match a reply. This flaw allows an attacker to perform a DNS Cache Poisoning attack. If chained with CVE-2020-25685 or CVE-2020-25686, the attack complexity of a successful attack is reduced. The highest threat from this vulnerability is to data integrity."
        },
        {
          "cve_code": "CVE-2020-25686",
          "base_score": "3.7",
          "impact_score": "1.4",
          "exploitability_score": "2.2",
          "attackVector": "NETWORK",
          "baseSeverity": "LOW",
          "attackComplexity": "HIGH",
          "version": "4.0",
          "description": "A flaw was found in dnsmasq before version 2.83. When receiving a query, dnsmasq does not check for an existing pending request for the same name and forwards a new request. By default, a maximum of 150 pending queries can be sent to upstream servers, so there can be at most 150 queries for the same name. This flaw allows an off-path attacker on the network to substantially reduce the number of attempts that it would have to perform to forge a reply and have it accepted by dnsmasq. This issue is mentioned in the \"Birthday Attacks\" section of RFC5452. If chained with CVE-2020-25684, the attack complexity of a successful attack is reduced. The highest threat from this vulnerability is to data integrity."
        },
        {
          "cve_code": "CVE-2020-25685",
          "base_score": "3.7",
          "impact_score": "1.4",
          "exploitability_score": "2.2",
          "attackVector": "NETWORK",
          "baseSeverity": "LOW",
          "attackComplexity": "HIGH",
          "version": "4.0",
          "description": "A flaw was found in dnsmasq before version 2.83. When getting a reply from a forwarded query, dnsmasq checks in forward.c:reply_query(), which is the forwarded query that matches the reply, by only using a weak hash of the query name. Due to the weak hash (CRC32 when dnsmasq is compiled without DNSSEC, SHA-1 when it is) this flaw allows an off-path attacker to find several different domains all having the same hash, substantially reducing the number of attempts they would have to perform to forge a reply and get it accepted by dnsmasq. This is in contrast with RFC5452, which specifies that the query name is one of the attributes of a query that must be used to match a reply. This flaw could be abused to perform a DNS Cache Poisoning attack. If chained with CVE-2020-25684 the attack complexity of a successful attack is reduced. The highest threat from this vulnerability is to data integrity."
        },
        {
          "cve_code": "CVE-2019-14834",
          "base_score": "3.7",
          "impact_score": "1.4",
          "exploitability_score": "2.2",
          "attackVector": "NETWORK",
          "baseSeverity": "LOW",
          "attackComplexity": "HIGH",
          "version": "4.0",
          "description": "A vulnerability was found in dnsmasq before version 2.81, where the memory leak allows remote attackers to cause a denial of service (memory consumption) via vectors involving DHCP response creation."
        }
      ],
      "uid_affected": [
        "3fdcf60ca9996523a1cc3169ffeb26b51d536bf79a9b6702c17a583cdb10dcf1_164828"
      ],
      "hid_affected": [
        "/bin/dhcps"
      ]
    },
    {
      "cpe_name": "Dnsmasq 2.52 (CRITICAL)",
      "cve_count": 0,
      "base_score": 2,
      "exploitability_score": 2,
      "impact_score": 2,
      "all_cve_objects_bs": [],
      "all_cve_objects_es": [
        {
          "cve_code": "CVE-2021-3448",
          "base_score": "4",
          "impact_score": "1.4",
          "exploitability_score": "2.2",
          "attackVector": "NETWORK",
          "baseSeverity": "MEDIUM",
          "attackComplexity": "HIGH",
          "version": "4.0",
          "description": "A flaw was found in dnsmasq in versions before 2.85. When configured to use a specific server for a given network interface, dnsmasq uses a fixed port while forwarding queries. An attacker on the network, able to find the outgoing port used by dnsmasq, only needs to guess the random transmission ID to forge a reply and get it accepted by dnsmasq. This flaw makes a DNS Cache Poisoning attack much easier. The highest threat from this vulnerability is to data integrity."
        },
        {
          "cve_code": "CVE-2020-25687",
          "base_score": "5.9",
          "impact_score": "3.6",
          "exploitability_score": "2.2",
          "attackVector": "NETWORK",
          "baseSeverity": "MEDIUM",
          "attackComplexity": "HIGH",
          "version": "4.0",
          "description": "A flaw was found in dnsmasq before version 2.83. A heap-based buffer overflow was discovered in dnsmasq when DNSSEC is enabled and before it validates the received DNS entries. This flaw allows a remote attacker, who can create valid DNS replies, to cause an overflow in a heap-allocated memory. This flaw is caused by the lack of length checks in rfc1035.c:extract_name(), which could be abused to make the code execute memcpy() with a negative size in sort_rrset() and cause a crash in dnsmasq, resulting in a denial of service. The highest threat from this vulnerability is to system availability."
        },
        {
          "cve_code": "CVE-2020-25684",
          "base_score": "3.7",
          "impact_score": "1.4",
          "exploitability_score": "2.2",
          "attackVector": "NETWORK",
          "baseSeverity": "LOW",
          "attackComplexity": "HIGH",
          "version": "4.0",
          "description": "A flaw was found in dnsmasq before version 2.83. When getting a reply from a forwarded query, dnsmasq checks in the forward.c:reply_query() if the reply destination address/port is used by the pending forwarded queries. However, it does not use the address/port to retrieve the exact forwarded query, substantially reducing the number of attempts an attacker on the network would have to perform to forge a reply and get it accepted by dnsmasq. This issue contrasts with RFC5452, which specifies a query's attributes that all must be used to match a reply. This flaw allows an attacker to perform a DNS Cache Poisoning attack. If chained with CVE-2020-25685 or CVE-2020-25686, the attack complexity of a successful attack is reduced. The highest threat from this vulnerability is to data integrity."
        },
        {
          "cve_code": "CVE-2020-25683",
          "base_score": "5.9",
          "impact_score": "3.6",
          "exploitability_score": "2.2",
          "attackVector": "NETWORK",
          "baseSeverity": "MEDIUM",
          "attackComplexity": "HIGH",
          "version": "4.0",
          "description": "A flaw was found in dnsmasq before version 2.83. A heap-based buffer overflow was discovered in dnsmasq when DNSSEC is enabled and before it validates the received DNS entries. A remote attacker, who can create valid DNS replies, could use this flaw to cause an overflow in a heap-allocated memory. This flaw is caused by the lack of length checks in rfc1035.c:extract_name(), which could be abused to make the code execute memcpy() with a negative size in get_rdata() and cause a crash in dnsmasq, resulting in a denial of service. The highest threat from this vulnerability is to system availability."
        },
        {
          "cve_code": "CVE-2020-25682",
          "base_score": "8.1",
          "impact_score": "5.9",
          "exploitability_score": "2.2",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "HIGH",
          "version": "4.0",
          "description": "A flaw was found in dnsmasq before 2.83. A buffer overflow vulnerability was discovered in the way dnsmasq extract names from DNS packets before validating them with DNSSEC data. An attacker on the network, who can create valid DNS replies, could use this flaw to cause an overflow with arbitrary data in a heap-allocated memory, possibly executing code on the machine. The flaw is in the rfc1035.c:extract_name() function, which writes data to the memory pointed by name assuming MAXDNAME*2 bytes are available in the buffer. However, in some code execution paths, it is possible extract_name() gets passed an offset from the base buffer, thus reducing, in practice, the number of available bytes that can be written in the buffer. The highest threat from this vulnerability is to data confidentiality and integrity as well as system availability."
        },
        {
          "cve_code": "CVE-2020-25681",
          "base_score": "8.1",
          "impact_score": "5.9",
          "exploitability_score": "2.2",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "HIGH",
          "version": "4.0",
          "description": "A flaw was found in dnsmasq before version 2.83. A heap-based buffer overflow was discovered in the way RRSets are sorted before validating with DNSSEC data. An attacker on the network, who can forge DNS replies such as that they are accepted as valid, could use this flaw to cause a buffer overflow with arbitrary data in a heap memory segment, possibly executing code on the machine. The highest threat from this vulnerability is to data confidentiality and integrity as well as system availability."
        },
        {
          "cve_code": "CVE-2020-25686",
          "base_score": "3.7",
          "impact_score": "1.4",
          "exploitability_score": "2.2",
          "attackVector": "NETWORK",
          "baseSeverity": "LOW",
          "attackComplexity": "HIGH",
          "version": "4.0",
          "description": "A flaw was found in dnsmasq before version 2.83. When receiving a query, dnsmasq does not check for an existing pending request for the same name and forwards a new request. By default, a maximum of 150 pending queries can be sent to upstream servers, so there can be at most 150 queries for the same name. This flaw allows an off-path attacker on the network to substantially reduce the number of attempts that it would have to perform to forge a reply and have it accepted by dnsmasq. This issue is mentioned in the \"Birthday Attacks\" section of RFC5452. If chained with CVE-2020-25684, the attack complexity of a successful attack is reduced. The highest threat from this vulnerability is to data integrity."
        },
        {
          "cve_code": "CVE-2020-25685",
          "base_score": "3.7",
          "impact_score": "1.4",
          "exploitability_score": "2.2",
          "attackVector": "NETWORK",
          "baseSeverity": "LOW",
          "attackComplexity": "HIGH",
          "version": "4.0",
          "description": "A flaw was found in dnsmasq before version 2.83. When getting a reply from a forwarded query, dnsmasq checks in forward.c:reply_query(), which is the forwarded query that matches the reply, by only using a weak hash of the query name. Due to the weak hash (CRC32 when dnsmasq is compiled without DNSSEC, SHA-1 when it is) this flaw allows an off-path attacker to find several different domains all having the same hash, substantially reducing the number of attempts they would have to perform to forge a reply and get it accepted by dnsmasq. This is in contrast with RFC5452, which specifies that the query name is one of the attributes of a query that must be used to match a reply. This flaw could be abused to perform a DNS Cache Poisoning attack. If chained with CVE-2020-25684 the attack complexity of a successful attack is reduced. The highest threat from this vulnerability is to data integrity."
        },
        {
          "cve_code": "CVE-2019-14834",
          "base_score": "3.7",
          "impact_score": "1.4",
          "exploitability_score": "2.2",
          "attackVector": "NETWORK",
          "baseSeverity": "LOW",
          "attackComplexity": "HIGH",
          "version": "4.0",
          "description": "A vulnerability was found in dnsmasq before version 2.81, where the memory leak allows remote attackers to cause a denial of service (memory consumption) via vectors involving DHCP response creation."
        },
        {
          "cve_code": "CVE-2017-14494",
          "base_score": "5.9",
          "impact_score": "3.6",
          "exploitability_score": "2.2",
          "attackVector": "NETWORK",
          "baseSeverity": "MEDIUM",
          "attackComplexity": "HIGH",
          "version": "4.0",
          "description": "dnsmasq before 2.78, when configured as a relay, allows remote attackers to obtain sensitive memory information via vectors involving handling DHCPv6 forwarded requests."
        }
      ],
      "all_cve_objects_is": [
        {
          "cve_code": "CVE-2012-3411",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "Dnsmasq before 2.63test1, when used with certain libvirt configurations, replies to requests from prohibited interfaces, which allows remote attackers to cause a denial of service (traffic amplification) via a spoofed DNS query."
        },
        {
          "cve_code": "CVE-2013-0198",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "Dnsmasq before 2.66test2, when used with certain libvirt configurations, replies to queries from prohibited interfaces, which allows remote attackers to cause a denial of service (traffic amplification) via spoofed TCP based DNS queries.  NOTE: this vulnerability exists because of an incomplete fix for CVE-2012-3411."
        }
      ],
      "uid_affected": [
        "3fdcf60ca9996523a1cc3169ffeb26b51d536bf79a9b6702c17a583cdb10dcf1_164828"
      ],
      "hid_affected": [
        "/bin/dhcps"
      ]
    },
    {
      "cpe_name": "Dnsmasq 2.52 (CRITICAL)",
      "cve_count": 0,
      "base_score": 3,
      "exploitability_score": 3,
      "impact_score": 3,
      "all_cve_objects_bs": [
        {
          "cve_code": "CVE-2020-25684",
          "base_score": "3.7",
          "impact_score": "1.4",
          "exploitability_score": "2.2",
          "attackVector": "NETWORK",
          "baseSeverity": "LOW",
          "attackComplexity": "HIGH",
          "version": "4.0",
          "description": "A flaw was found in dnsmasq before version 2.83. When getting a reply from a forwarded query, dnsmasq checks in the forward.c:reply_query() if the reply destination address/port is used by the pending forwarded queries. However, it does not use the address/port to retrieve the exact forwarded query, substantially reducing the number of attempts an attacker on the network would have to perform to forge a reply and get it accepted by dnsmasq. This issue contrasts with RFC5452, which specifies a query's attributes that all must be used to match a reply. This flaw allows an attacker to perform a DNS Cache Poisoning attack. If chained with CVE-2020-25685 or CVE-2020-25686, the attack complexity of a successful attack is reduced. The highest threat from this vulnerability is to data integrity."
        },
        {
          "cve_code": "CVE-2020-25686",
          "base_score": "3.7",
          "impact_score": "1.4",
          "exploitability_score": "2.2",
          "attackVector": "NETWORK",
          "baseSeverity": "LOW",
          "attackComplexity": "HIGH",
          "version": "4.0",
          "description": "A flaw was found in dnsmasq before version 2.83. When receiving a query, dnsmasq does not check for an existing pending request for the same name and forwards a new request. By default, a maximum of 150 pending queries can be sent to upstream servers, so there can be at most 150 queries for the same name. This flaw allows an off-path attacker on the network to substantially reduce the number of attempts that it would have to perform to forge a reply and have it accepted by dnsmasq. This issue is mentioned in the \"Birthday Attacks\" section of RFC5452. If chained with CVE-2020-25684, the attack complexity of a successful attack is reduced. The highest threat from this vulnerability is to data integrity."
        },
        {
          "cve_code": "CVE-2020-25685",
          "base_score": "3.7",
          "impact_score": "1.4",
          "exploitability_score": "2.2",
          "attackVector": "NETWORK",
          "baseSeverity": "LOW",
          "attackComplexity": "HIGH",
          "version": "4.0",
          "description": "A flaw was found in dnsmasq before version 2.83. When getting a reply from a forwarded query, dnsmasq checks in forward.c:reply_query(), which is the forwarded query that matches the reply, by only using a weak hash of the query name. Due to the weak hash (CRC32 when dnsmasq is compiled without DNSSEC, SHA-1 when it is) this flaw allows an off-path attacker to find several different domains all having the same hash, substantially reducing the number of attempts they would have to perform to forge a reply and get it accepted by dnsmasq. This is in contrast with RFC5452, which specifies that the query name is one of the attributes of a query that must be used to match a reply. This flaw could be abused to perform a DNS Cache Poisoning attack. If chained with CVE-2020-25684 the attack complexity of a successful attack is reduced. The highest threat from this vulnerability is to data integrity."
        },
        {
          "cve_code": "CVE-2019-14834",
          "base_score": "3.7",
          "impact_score": "1.4",
          "exploitability_score": "2.2",
          "attackVector": "NETWORK",
          "baseSeverity": "LOW",
          "attackComplexity": "HIGH",
          "version": "4.0",
          "description": "A vulnerability was found in dnsmasq before version 2.81, where the memory leak allows remote attackers to cause a denial of service (memory consumption) via vectors involving DHCP response creation."
        }
      ],
      "all_cve_objects_es": [
        {
          "cve_code": "CVE-2017-14491",
          "base_score": "9.8",
          "impact_score": "5.9",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "CRITICAL",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "Heap-based buffer overflow in dnsmasq before 2.78 allows remote attackers to cause a denial of service (crash) or execute arbitrary code via a crafted DNS response."
        },
        {
          "cve_code": "CVE-2019-14513",
          "base_score": "7.5",
          "impact_score": "3.6",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "Improper bounds checking in Dnsmasq before 2.76 allows an attacker controlled DNS server to send large DNS packets that result in a read operation beyond the buffer allocated for the packet, a different vulnerability than CVE-2017-14491."
        },
        {
          "cve_code": "CVE-2017-15107",
          "base_score": "7.5",
          "impact_score": "3.6",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "A vulnerability was found in the implementation of DNSSEC in Dnsmasq up to and including 2.78. Wildcard synthesized NSEC records could be improperly interpreted to prove the non-existence of hostnames that actually exist."
        },
        {
          "cve_code": "CVE-2017-14495",
          "base_score": "7.5",
          "impact_score": "3.6",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "Memory leak in dnsmasq before 2.78, when the --add-mac, --add-cpe-id or --add-subnet option is specified, allows remote attackers to cause a denial of service (memory consumption) via vectors involving DNS response creation."
        },
        {
          "cve_code": "CVE-2017-14496",
          "base_score": "7.5",
          "impact_score": "3.6",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "Integer underflow in the add_pseudoheader function in dnsmasq before 2.78 , when the --add-mac, --add-cpe-id or --add-subnet option is specified, allows remote attackers to cause a denial of service via a crafted DNS request."
        },
        {
          "cve_code": "CVE-2017-13704",
          "base_score": "7.5",
          "impact_score": "3.6",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "In dnsmasq before 2.78, if the DNS packet size does not match the expected size, the size parameter in a memset call gets a negative value. As it is an unsigned value, memset ends up writing up to 0xffffffff zero's (0xffffffffffffffff in 64 bit platforms), making dnsmasq crash."
        },
        {
          "cve_code": "CVE-2017-14493",
          "base_score": "9.8",
          "impact_score": "5.9",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "CRITICAL",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "Stack-based buffer overflow in dnsmasq before 2.78 allows remote attackers to cause a denial of service (crash) or execute arbitrary code via a crafted DHCPv6 request."
        },
        {
          "cve_code": "CVE-2017-14492",
          "base_score": "9.8",
          "impact_score": "5.9",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "CRITICAL",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "Heap-based buffer overflow in dnsmasq before 2.78 allows remote attackers to cause a denial of service (crash) or execute arbitrary code via a crafted IPv6 router advertisement request."
        },
        {
          "cve_code": "CVE-2015-8899",
          "base_score": "7.5",
          "impact_score": "3.6",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "Dnsmasq before 2.76 allows remote servers to cause a denial of service (crash) via a reply with an empty DNS address that has an (1) A or (2) AAAA record defined locally."
        }
      ],
      "all_cve_objects_is": [
        {
          "cve_code": "CVE-2020-25687",
          "base_score": "5.9",
          "impact_score": "3.6",
          "exploitability_score": "2.2",
          "attackVector": "NETWORK",
          "baseSeverity": "MEDIUM",
          "attackComplexity": "HIGH",
          "version": "4.0",
          "description": "A flaw was found in dnsmasq before version 2.83. A heap-based buffer overflow was discovered in dnsmasq when DNSSEC is enabled and before it validates the received DNS entries. This flaw allows a remote attacker, who can create valid DNS replies, to cause an overflow in a heap-allocated memory. This flaw is caused by the lack of length checks in rfc1035.c:extract_name(), which could be abused to make the code execute memcpy() with a negative size in sort_rrset() and cause a crash in dnsmasq, resulting in a denial of service. The highest threat from this vulnerability is to system availability."
        },
        {
          "cve_code": "CVE-2020-25683",
          "base_score": "5.9",
          "impact_score": "3.6",
          "exploitability_score": "2.2",
          "attackVector": "NETWORK",
          "baseSeverity": "MEDIUM",
          "attackComplexity": "HIGH",
          "version": "4.0",
          "description": "A flaw was found in dnsmasq before version 2.83. A heap-based buffer overflow was discovered in dnsmasq when DNSSEC is enabled and before it validates the received DNS entries. A remote attacker, who can create valid DNS replies, could use this flaw to cause an overflow in a heap-allocated memory. This flaw is caused by the lack of length checks in rfc1035.c:extract_name(), which could be abused to make the code execute memcpy() with a negative size in get_rdata() and cause a crash in dnsmasq, resulting in a denial of service. The highest threat from this vulnerability is to system availability."
        },
        {
          "cve_code": "CVE-2019-14513",
          "base_score": "7.5",
          "impact_score": "3.6",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "Improper bounds checking in Dnsmasq before 2.76 allows an attacker controlled DNS server to send large DNS packets that result in a read operation beyond the buffer allocated for the packet, a different vulnerability than CVE-2017-14491."
        },
        {
          "cve_code": "CVE-2017-15107",
          "base_score": "7.5",
          "impact_score": "3.6",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "A vulnerability was found in the implementation of DNSSEC in Dnsmasq up to and including 2.78. Wildcard synthesized NSEC records could be improperly interpreted to prove the non-existence of hostnames that actually exist."
        },
        {
          "cve_code": "CVE-2017-14495",
          "base_score": "7.5",
          "impact_score": "3.6",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "Memory leak in dnsmasq before 2.78, when the --add-mac, --add-cpe-id or --add-subnet option is specified, allows remote attackers to cause a denial of service (memory consumption) via vectors involving DNS response creation."
        },
        {
          "cve_code": "CVE-2017-14496",
          "base_score": "7.5",
          "impact_score": "3.6",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "Integer underflow in the add_pseudoheader function in dnsmasq before 2.78 , when the --add-mac, --add-cpe-id or --add-subnet option is specified, allows remote attackers to cause a denial of service via a crafted DNS request."
        },
        {
          "cve_code": "CVE-2017-13704",
          "base_score": "7.5",
          "impact_score": "3.6",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "In dnsmasq before 2.78, if the DNS packet size does not match the expected size, the size parameter in a memset call gets a negative value. As it is an unsigned value, memset ends up writing up to 0xffffffff zero's (0xffffffffffffffff in 64 bit platforms), making dnsmasq crash."
        },
        {
          "cve_code": "CVE-2017-14494",
          "base_score": "5.9",
          "impact_score": "3.6",
          "exploitability_score": "2.2",
          "attackVector": "NETWORK",
          "baseSeverity": "MEDIUM",
          "attackComplexity": "HIGH",
          "version": "4.0",
          "description": "dnsmasq before 2.78, when configured as a relay, allows remote attackers to obtain sensitive memory information via vectors involving handling DHCPv6 forwarded requests."
        },
        {
          "cve_code": "CVE-2015-8899",
          "base_score": "7.5",
          "impact_score": "3.6",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "Dnsmasq before 2.76 allows remote servers to cause a denial of service (crash) via a reply with an empty DNS address that has an (1) A or (2) AAAA record defined locally."
        }
      ],
      "uid_affected": [
        "3fdcf60ca9996523a1cc3169ffeb26b51d536bf79a9b6702c17a583cdb10dcf1_164828"
      ],
      "hid_affected": [
        "/bin/dhcps"
      ]
    },
    {
      "cpe_name": "Dnsmasq 2.52 (CRITICAL)",
      "cve_count": 0,
      "base_score": 4,
      "exploitability_score": 4,
      "impact_score": 4,
      "all_cve_objects_bs": [
        {
          "cve_code": "CVE-2021-3448",
          "base_score": "4",
          "impact_score": "1.4",
          "exploitability_score": "2.2",
          "attackVector": "NETWORK",
          "baseSeverity": "MEDIUM",
          "attackComplexity": "HIGH",
          "version": "4.0",
          "description": "A flaw was found in dnsmasq in versions before 2.85. When configured to use a specific server for a given network interface, dnsmasq uses a fixed port while forwarding queries. An attacker on the network, able to find the outgoing port used by dnsmasq, only needs to guess the random transmission ID to forge a reply and get it accepted by dnsmasq. This flaw makes a DNS Cache Poisoning attack much easier. The highest threat from this vulnerability is to data integrity."
        }
      ],
      "all_cve_objects_es": [],
      "all_cve_objects_is": [
        {
          "cve_code": "CVE-2015-3294",
          "base_score": "6.4",
          "impact_score": "4.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "The tcp_request function in Dnsmasq before 2.73rc4 does not properly handle the return value of the setup_reply function, which allows remote attackers to read process memory and cause a denial of service (out-of-bounds read and crash) via a malformed DNS request."
        }
      ],
      "uid_affected": [
        "3fdcf60ca9996523a1cc3169ffeb26b51d536bf79a9b6702c17a583cdb10dcf1_164828"
      ],
      "hid_affected": [
        "/bin/dhcps"
      ]
    },
    {
      "cpe_name": "Dnsmasq 2.52 (CRITICAL)",
      "cve_count": 0,
      "base_score": 5,
      "exploitability_score": 5,
      "impact_score": 5,
      "all_cve_objects_bs": [
        {
          "cve_code": "CVE-2020-25687",
          "base_score": "5.9",
          "impact_score": "3.6",
          "exploitability_score": "2.2",
          "attackVector": "NETWORK",
          "baseSeverity": "MEDIUM",
          "attackComplexity": "HIGH",
          "version": "4.0",
          "description": "A flaw was found in dnsmasq before version 2.83. A heap-based buffer overflow was discovered in dnsmasq when DNSSEC is enabled and before it validates the received DNS entries. This flaw allows a remote attacker, who can create valid DNS replies, to cause an overflow in a heap-allocated memory. This flaw is caused by the lack of length checks in rfc1035.c:extract_name(), which could be abused to make the code execute memcpy() with a negative size in sort_rrset() and cause a crash in dnsmasq, resulting in a denial of service. The highest threat from this vulnerability is to system availability."
        },
        {
          "cve_code": "CVE-2020-25683",
          "base_score": "5.9",
          "impact_score": "3.6",
          "exploitability_score": "2.2",
          "attackVector": "NETWORK",
          "baseSeverity": "MEDIUM",
          "attackComplexity": "HIGH",
          "version": "4.0",
          "description": "A flaw was found in dnsmasq before version 2.83. A heap-based buffer overflow was discovered in dnsmasq when DNSSEC is enabled and before it validates the received DNS entries. A remote attacker, who can create valid DNS replies, could use this flaw to cause an overflow in a heap-allocated memory. This flaw is caused by the lack of length checks in rfc1035.c:extract_name(), which could be abused to make the code execute memcpy() with a negative size in get_rdata() and cause a crash in dnsmasq, resulting in a denial of service. The highest threat from this vulnerability is to system availability."
        },
        {
          "cve_code": "CVE-2012-3411",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "Dnsmasq before 2.63test1, when used with certain libvirt configurations, replies to requests from prohibited interfaces, which allows remote attackers to cause a denial of service (traffic amplification) via a spoofed DNS query."
        },
        {
          "cve_code": "CVE-2013-0198",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "Dnsmasq before 2.66test2, when used with certain libvirt configurations, replies to queries from prohibited interfaces, which allows remote attackers to cause a denial of service (traffic amplification) via spoofed TCP based DNS queries.  NOTE: this vulnerability exists because of an incomplete fix for CVE-2012-3411."
        },
        {
          "cve_code": "CVE-2017-14494",
          "base_score": "5.9",
          "impact_score": "3.6",
          "exploitability_score": "2.2",
          "attackVector": "NETWORK",
          "baseSeverity": "MEDIUM",
          "attackComplexity": "HIGH",
          "version": "4.0",
          "description": "dnsmasq before 2.78, when configured as a relay, allows remote attackers to obtain sensitive memory information via vectors involving handling DHCPv6 forwarded requests."
        }
      ],
      "all_cve_objects_es": [],
      "all_cve_objects_is": [
        {
          "cve_code": "CVE-2017-14491",
          "base_score": "9.8",
          "impact_score": "5.9",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "CRITICAL",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "Heap-based buffer overflow in dnsmasq before 2.78 allows remote attackers to cause a denial of service (crash) or execute arbitrary code via a crafted DNS response."
        },
        {
          "cve_code": "CVE-2020-25682",
          "base_score": "8.1",
          "impact_score": "5.9",
          "exploitability_score": "2.2",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "HIGH",
          "version": "4.0",
          "description": "A flaw was found in dnsmasq before 2.83. A buffer overflow vulnerability was discovered in the way dnsmasq extract names from DNS packets before validating them with DNSSEC data. An attacker on the network, who can create valid DNS replies, could use this flaw to cause an overflow with arbitrary data in a heap-allocated memory, possibly executing code on the machine. The flaw is in the rfc1035.c:extract_name() function, which writes data to the memory pointed by name assuming MAXDNAME*2 bytes are available in the buffer. However, in some code execution paths, it is possible extract_name() gets passed an offset from the base buffer, thus reducing, in practice, the number of available bytes that can be written in the buffer. The highest threat from this vulnerability is to data confidentiality and integrity as well as system availability."
        },
        {
          "cve_code": "CVE-2020-25681",
          "base_score": "8.1",
          "impact_score": "5.9",
          "exploitability_score": "2.2",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "HIGH",
          "version": "4.0",
          "description": "A flaw was found in dnsmasq before version 2.83. A heap-based buffer overflow was discovered in the way RRSets are sorted before validating with DNSSEC data. An attacker on the network, who can forge DNS replies such as that they are accepted as valid, could use this flaw to cause a buffer overflow with arbitrary data in a heap memory segment, possibly executing code on the machine. The highest threat from this vulnerability is to data confidentiality and integrity as well as system availability."
        },
        {
          "cve_code": "CVE-2017-14493",
          "base_score": "9.8",
          "impact_score": "5.9",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "CRITICAL",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "Stack-based buffer overflow in dnsmasq before 2.78 allows remote attackers to cause a denial of service (crash) or execute arbitrary code via a crafted DHCPv6 request."
        },
        {
          "cve_code": "CVE-2017-14492",
          "base_score": "9.8",
          "impact_score": "5.9",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "CRITICAL",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "Heap-based buffer overflow in dnsmasq before 2.78 allows remote attackers to cause a denial of service (crash) or execute arbitrary code via a crafted IPv6 router advertisement request."
        }
      ],
      "uid_affected": [
        "3fdcf60ca9996523a1cc3169ffeb26b51d536bf79a9b6702c17a583cdb10dcf1_164828"
      ],
      "hid_affected": [
        "/bin/dhcps"
      ]
    },
    {
      "cpe_name": "Dnsmasq 2.52 (CRITICAL)",
      "cve_count": 0,
      "base_score": 6,
      "exploitability_score": 6,
      "impact_score": 6,
      "all_cve_objects_bs": [
        {
          "cve_code": "CVE-2015-3294",
          "base_score": "6.4",
          "impact_score": "4.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "The tcp_request function in Dnsmasq before 2.73rc4 does not properly handle the return value of the setup_reply function, which allows remote attackers to read process memory and cause a denial of service (out-of-bounds read and crash) via a malformed DNS request."
        }
      ],
      "all_cve_objects_es": [],
      "all_cve_objects_is": [],
      "uid_affected": [
        "3fdcf60ca9996523a1cc3169ffeb26b51d536bf79a9b6702c17a583cdb10dcf1_164828"
      ],
      "hid_affected": [
        "/bin/dhcps"
      ]
    },
    {
      "cpe_name": "Dnsmasq 2.52 (CRITICAL)",
      "cve_count": 0,
      "base_score": 7,
      "exploitability_score": 7,
      "impact_score": 7,
      "all_cve_objects_bs": [
        {
          "cve_code": "CVE-2019-14513",
          "base_score": "7.5",
          "impact_score": "3.6",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "Improper bounds checking in Dnsmasq before 2.76 allows an attacker controlled DNS server to send large DNS packets that result in a read operation beyond the buffer allocated for the packet, a different vulnerability than CVE-2017-14491."
        },
        {
          "cve_code": "CVE-2017-15107",
          "base_score": "7.5",
          "impact_score": "3.6",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "A vulnerability was found in the implementation of DNSSEC in Dnsmasq up to and including 2.78. Wildcard synthesized NSEC records could be improperly interpreted to prove the non-existence of hostnames that actually exist."
        },
        {
          "cve_code": "CVE-2017-14495",
          "base_score": "7.5",
          "impact_score": "3.6",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "Memory leak in dnsmasq before 2.78, when the --add-mac, --add-cpe-id or --add-subnet option is specified, allows remote attackers to cause a denial of service (memory consumption) via vectors involving DNS response creation."
        },
        {
          "cve_code": "CVE-2017-14496",
          "base_score": "7.5",
          "impact_score": "3.6",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "Integer underflow in the add_pseudoheader function in dnsmasq before 2.78 , when the --add-mac, --add-cpe-id or --add-subnet option is specified, allows remote attackers to cause a denial of service via a crafted DNS request."
        },
        {
          "cve_code": "CVE-2017-13704",
          "base_score": "7.5",
          "impact_score": "3.6",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "In dnsmasq before 2.78, if the DNS packet size does not match the expected size, the size parameter in a memset call gets a negative value. As it is an unsigned value, memset ends up writing up to 0xffffffff zero's (0xffffffffffffffff in 64 bit platforms), making dnsmasq crash."
        },
        {
          "cve_code": "CVE-2015-8899",
          "base_score": "7.5",
          "impact_score": "3.6",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "Dnsmasq before 2.76 allows remote servers to cause a denial of service (crash) via a reply with an empty DNS address that has an (1) A or (2) AAAA record defined locally."
        }
      ],
      "all_cve_objects_es": [],
      "all_cve_objects_is": [],
      "uid_affected": [
        "3fdcf60ca9996523a1cc3169ffeb26b51d536bf79a9b6702c17a583cdb10dcf1_164828"
      ],
      "hid_affected": [
        "/bin/dhcps"
      ]
    },
    {
      "cpe_name": "Dnsmasq 2.52 (CRITICAL)",
      "cve_count": 0,
      "base_score": 8,
      "exploitability_score": 8,
      "impact_score": 8,
      "all_cve_objects_bs": [
        {
          "cve_code": "CVE-2020-25682",
          "base_score": "8.1",
          "impact_score": "5.9",
          "exploitability_score": "2.2",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "HIGH",
          "version": "4.0",
          "description": "A flaw was found in dnsmasq before 2.83. A buffer overflow vulnerability was discovered in the way dnsmasq extract names from DNS packets before validating them with DNSSEC data. An attacker on the network, who can create valid DNS replies, could use this flaw to cause an overflow with arbitrary data in a heap-allocated memory, possibly executing code on the machine. The flaw is in the rfc1035.c:extract_name() function, which writes data to the memory pointed by name assuming MAXDNAME*2 bytes are available in the buffer. However, in some code execution paths, it is possible extract_name() gets passed an offset from the base buffer, thus reducing, in practice, the number of available bytes that can be written in the buffer. The highest threat from this vulnerability is to data confidentiality and integrity as well as system availability."
        },
        {
          "cve_code": "CVE-2020-25681",
          "base_score": "8.1",
          "impact_score": "5.9",
          "exploitability_score": "2.2",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "HIGH",
          "version": "4.0",
          "description": "A flaw was found in dnsmasq before version 2.83. A heap-based buffer overflow was discovered in the way RRSets are sorted before validating with DNSSEC data. An attacker on the network, who can forge DNS replies such as that they are accepted as valid, could use this flaw to cause a buffer overflow with arbitrary data in a heap memory segment, possibly executing code on the machine. The highest threat from this vulnerability is to data confidentiality and integrity as well as system availability."
        }
      ],
      "all_cve_objects_es": [],
      "all_cve_objects_is": [],
      "uid_affected": [
        "3fdcf60ca9996523a1cc3169ffeb26b51d536bf79a9b6702c17a583cdb10dcf1_164828"
      ],
      "hid_affected": [
        "/bin/dhcps"
      ]
    },
    {
      "cpe_name": "Dnsmasq 2.52 (CRITICAL)",
      "cve_count": 0,
      "base_score": 9,
      "exploitability_score": 9,
      "impact_score": 9,
      "all_cve_objects_bs": [
        {
          "cve_code": "CVE-2017-14491",
          "base_score": "9.8",
          "impact_score": "5.9",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "CRITICAL",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "Heap-based buffer overflow in dnsmasq before 2.78 allows remote attackers to cause a denial of service (crash) or execute arbitrary code via a crafted DNS response."
        },
        {
          "cve_code": "CVE-2017-14493",
          "base_score": "9.8",
          "impact_score": "5.9",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "CRITICAL",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "Stack-based buffer overflow in dnsmasq before 2.78 allows remote attackers to cause a denial of service (crash) or execute arbitrary code via a crafted DHCPv6 request."
        },
        {
          "cve_code": "CVE-2017-14492",
          "base_score": "9.8",
          "impact_score": "5.9",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "CRITICAL",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "Heap-based buffer overflow in dnsmasq before 2.78 allows remote attackers to cause a denial of service (crash) or execute arbitrary code via a crafted IPv6 router advertisement request."
        }
      ],
      "all_cve_objects_es": [],
      "all_cve_objects_is": [],
      "uid_affected": [
        "3fdcf60ca9996523a1cc3169ffeb26b51d536bf79a9b6702c17a583cdb10dcf1_164828"
      ],
      "hid_affected": [
        "/bin/dhcps"
      ]
    },
    {
      "cpe_name": "Dnsmasq 2.52 (CRITICAL)",
      "cve_count": 0,
      "base_score": 10,
      "exploitability_score": 10,
      "impact_score": 10,
      "all_cve_objects_bs": [],
      "all_cve_objects_es": [
        {
          "cve_code": "CVE-2012-3411",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "Dnsmasq before 2.63test1, when used with certain libvirt configurations, replies to requests from prohibited interfaces, which allows remote attackers to cause a denial of service (traffic amplification) via a spoofed DNS query."
        },
        {
          "cve_code": "CVE-2013-0198",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "Dnsmasq before 2.66test2, when used with certain libvirt configurations, replies to queries from prohibited interfaces, which allows remote attackers to cause a denial of service (traffic amplification) via spoofed TCP based DNS queries.  NOTE: this vulnerability exists because of an incomplete fix for CVE-2012-3411."
        },
        {
          "cve_code": "CVE-2015-3294",
          "base_score": "6.4",
          "impact_score": "4.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "The tcp_request function in Dnsmasq before 2.73rc4 does not properly handle the return value of the setup_reply function, which allows remote attackers to read process memory and cause a denial of service (out-of-bounds read and crash) via a malformed DNS request."
        }
      ],
      "all_cve_objects_is": [],
      "uid_affected": [
        "3fdcf60ca9996523a1cc3169ffeb26b51d536bf79a9b6702c17a583cdb10dcf1_164828"
      ],
      "hid_affected": [
        "/bin/dhcps"
      ]
    },
    {
      "cpe_name": "OpenSSL 1.0.0 (CRITICAL)",
      "cve_count": 0,
      "base_score": 1,
      "exploitability_score": 1,
      "impact_score": 1,
      "all_cve_objects_bs": [
        {
          "cve_code": "CVE-2014-0076",
          "base_score": "1.9",
          "impact_score": "2.9",
          "exploitability_score": "3.4",
          "version": "4.0",
          "description": "The Montgomery ladder implementation in OpenSSL through 1.0.0l does not ensure that certain swap operations have a constant-time behavior, which makes it easier for local users to obtain ECDSA nonces via a FLUSH+RELOAD cache side-channel attack."
        }
      ],
      "all_cve_objects_es": [
        {
          "cve_code": "CVE-2014-3566",
          "base_score": "3.4",
          "impact_score": "1.4",
          "exploitability_score": "1.6",
          "attackVector": "NETWORK",
          "baseSeverity": "LOW",
          "attackComplexity": "HIGH",
          "version": "4.0",
          "description": "The SSL protocol 3.0, as used in OpenSSL through 1.0.1i and other products, uses nondeterministic CBC padding, which makes it easier for man-in-the-middle attackers to obtain cleartext data via a padding-oracle attack, aka the \"POODLE\" issue."
        },
        {
          "cve_code": "CVE-2016-7056",
          "base_score": "5.5",
          "impact_score": "3.6",
          "exploitability_score": "1.8",
          "attackVector": "LOCAL",
          "baseSeverity": "MEDIUM",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "A timing attack flaw was found in OpenSSL 1.0.1u and before that could allow a malicious user with local access to recover ECDSA P-256 private keys."
        }
      ],
      "all_cve_objects_is": [
        {
          "cve_code": "CVE-2014-3566",
          "base_score": "3.4",
          "impact_score": "1.4",
          "exploitability_score": "1.6",
          "attackVector": "NETWORK",
          "baseSeverity": "LOW",
          "attackComplexity": "HIGH",
          "version": "4.0",
          "description": "The SSL protocol 3.0, as used in OpenSSL through 1.0.1i and other products, uses nondeterministic CBC padding, which makes it easier for man-in-the-middle attackers to obtain cleartext data via a padding-oracle attack, aka the \"POODLE\" issue."
        },
        {
          "cve_code": "CVE-2015-4000",
          "base_score": "3.7",
          "impact_score": "1.4",
          "exploitability_score": "2.2",
          "attackVector": "NETWORK",
          "baseSeverity": "LOW",
          "attackComplexity": "HIGH",
          "version": "4.0",
          "description": "The TLS protocol 1.2 and earlier, when a DHE_EXPORT ciphersuite is enabled on a server but not on a client, does not properly convey a DHE_EXPORT choice, which allows man-in-the-middle attackers to conduct cipher-downgrade attacks by rewriting a ClientHello with DHE replaced by DHE_EXPORT and then rewriting a ServerHello with DHE_EXPORT replaced by DHE, aka the \"Logjam\" issue."
        },
        {
          "cve_code": "CVE-2020-7042",
          "base_score": "5.3",
          "impact_score": "1.4",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "MEDIUM",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "An issue was discovered in openfortivpn 1.11.0 when used with OpenSSL 1.0.2 or later. tunnel.c mishandles certificate validation because the hostname check operates on uninitialized memory. The outcome is that a valid certificate is never accepted (only a malformed certificate may be accepted)."
        },
        {
          "cve_code": "CVE-2017-3735",
          "base_score": "5.3",
          "impact_score": "1.4",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "MEDIUM",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "While parsing an IPAddressFamily extension in an X.509 certificate, it is possible to do a one-byte overread. This would result in an incorrect text display of the certificate. This bug has been present since 2006 and is present in all versions of OpenSSL before 1.0.2m and 1.1.0g."
        },
        {
          "cve_code": "CVE-2015-3195",
          "base_score": "5.3",
          "impact_score": "1.4",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "MEDIUM",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "The ASN1_TFLG_COMBINE implementation in crypto/asn1/tasn_dec.c in OpenSSL before 0.9.8zh, 1.0.0 before 1.0.0t, 1.0.1 before 1.0.1q, and 1.0.2 before 1.0.2e mishandles errors caused by malformed X509_ATTRIBUTE data, which allows remote attackers to obtain sensitive information from process memory by triggering a decoding failure in a PKCS#7 or CMS application."
        },
        {
          "cve_code": "CVE-2020-7041",
          "base_score": "5.3",
          "impact_score": "1.4",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "MEDIUM",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "An issue was discovered in openfortivpn 1.11.0 when used with OpenSSL 1.0.2 or later. tunnel.c mishandles certificate validation because an X509_check_host negative error code is interpreted as a successful return value."
        }
      ],
      "uid_affected": [
        "201ac67dd9abe5826f687f02526d3ae616d28a8b4a1bca0c451be66b93b539ea_2034604"
      ],
      "hid_affected": [
        "/bin/WTP"
      ]
    },
    {
      "cpe_name": "OpenSSL 1.0.0 (CRITICAL)",
      "cve_count": 0,
      "base_score": 2,
      "exploitability_score": 2,
      "impact_score": 2,
      "all_cve_objects_bs": [
        {
          "cve_code": "CVE-2013-0169",
          "base_score": "2.6",
          "impact_score": "2.9",
          "exploitability_score": "4.9",
          "version": "4.0",
          "description": "The TLS protocol 1.1 and 1.2 and the DTLS protocol 1.0 and 1.2, as used in OpenSSL, OpenJDK, PolarSSL, and other products, do not properly consider timing side-channel attacks on a MAC check requirement during the processing of malformed CBC padding, which allows remote attackers to conduct distinguishing attacks and plaintext-recovery attacks via statistical analysis of timing data for crafted packets, aka the \"Lucky Thirteen\" issue."
        },
        {
          "cve_code": "CVE-2011-1945",
          "base_score": "2.6",
          "impact_score": "2.9",
          "exploitability_score": "4.9",
          "version": "4.0",
          "description": "The elliptic curve cryptography (ECC) subsystem in OpenSSL 1.0.0d and earlier, when the Elliptic Curve Digital Signature Algorithm (ECDSA) is used for the ECDHE_ECDSA cipher suite, does not properly implement curves over binary fields, which makes it easier for context-dependent attackers to determine private keys via a timing attack and a lattice calculation."
        }
      ],
      "all_cve_objects_es": [
        {
          "cve_code": "CVE-2014-0224",
          "base_score": "7.4",
          "impact_score": "5.2",
          "exploitability_score": "2.2",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "HIGH",
          "version": "4.0",
          "description": "OpenSSL before 0.9.8za, 1.0.0 before 1.0.0m, and 1.0.1 before 1.0.1h does not properly restrict processing of ChangeCipherSpec messages, which allows man-in-the-middle attackers to trigger use of a zero-length master key in certain OpenSSL-to-OpenSSL communications, and consequently hijack sessions or obtain sensitive information, via a crafted TLS handshake, aka the \"CCS Injection\" vulnerability."
        },
        {
          "cve_code": "CVE-2015-4000",
          "base_score": "3.7",
          "impact_score": "1.4",
          "exploitability_score": "2.2",
          "attackVector": "NETWORK",
          "baseSeverity": "LOW",
          "attackComplexity": "HIGH",
          "version": "4.0",
          "description": "The TLS protocol 1.2 and earlier, when a DHE_EXPORT ciphersuite is enabled on a server but not on a client, does not properly convey a DHE_EXPORT choice, which allows man-in-the-middle attackers to conduct cipher-downgrade attacks by rewriting a ClientHello with DHE replaced by DHE_EXPORT and then rewriting a ServerHello with DHE_EXPORT replaced by DHE, aka the \"Logjam\" issue."
        },
        {
          "cve_code": "CVE-2016-2107",
          "base_score": "5.9",
          "impact_score": "3.6",
          "exploitability_score": "2.2",
          "attackVector": "NETWORK",
          "baseSeverity": "MEDIUM",
          "attackComplexity": "HIGH",
          "version": "4.0",
          "description": "The AES-NI implementation in OpenSSL before 1.0.1t and 1.0.2 before 1.0.2h does not consider memory allocation during a certain padding check, which allows remote attackers to obtain sensitive cleartext information via a padding-oracle attack against an AES CBC session. NOTE: this vulnerability exists because of an incorrect fix for CVE-2013-0169."
        },
        {
          "cve_code": "CVE-2016-0704",
          "base_score": "5.9",
          "impact_score": "3.6",
          "exploitability_score": "2.2",
          "attackVector": "NETWORK",
          "baseSeverity": "MEDIUM",
          "attackComplexity": "HIGH",
          "version": "4.0",
          "description": "An oracle protection mechanism in the get_client_master_key function in s2_srvr.c in the SSLv2 implementation in OpenSSL before 0.9.8zf, 1.0.0 before 1.0.0r, 1.0.1 before 1.0.1m, and 1.0.2 before 1.0.2a overwrites incorrect MASTER-KEY bytes during use of export cipher suites, which makes it easier for remote attackers to decrypt TLS ciphertext data by leveraging a Bleichenbacher RSA padding oracle, a related issue to CVE-2016-0800."
        },
        {
          "cve_code": "CVE-2016-0703",
          "base_score": "5.9",
          "impact_score": "3.6",
          "exploitability_score": "2.2",
          "attackVector": "NETWORK",
          "baseSeverity": "MEDIUM",
          "attackComplexity": "HIGH",
          "version": "4.0",
          "description": "The get_client_master_key function in s2_srvr.c in the SSLv2 implementation in OpenSSL before 0.9.8zf, 1.0.0 before 1.0.0r, 1.0.1 before 1.0.1m, and 1.0.2 before 1.0.2a accepts a nonzero CLIENT-MASTER-KEY CLEAR-KEY-LENGTH value for an arbitrary cipher, which allows man-in-the-middle attackers to determine the MASTER-KEY value and decrypt TLS ciphertext data by leveraging a Bleichenbacher RSA padding oracle, a related issue to CVE-2016-0800."
        }
      ],
      "all_cve_objects_is": [
        {
          "cve_code": "CVE-2015-1790",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "The PKCS7_dataDecodefunction in crypto/pkcs7/pk7_doit.c in OpenSSL before 0.9.8zg, 1.0.0 before 1.0.0s, 1.0.1 before 1.0.1n, and 1.0.2 before 1.0.2b allows remote attackers to cause a denial of service (NULL pointer dereference and application crash) via a PKCS#7 blob that uses ASN.1 encoding and lacks inner EncryptedContent data."
        },
        {
          "cve_code": "CVE-2013-0169",
          "base_score": "2.6",
          "impact_score": "2.9",
          "exploitability_score": "4.9",
          "version": "4.0",
          "description": "The TLS protocol 1.1 and 1.2 and the DTLS protocol 1.0 and 1.2, as used in OpenSSL, OpenJDK, PolarSSL, and other products, do not properly consider timing side-channel attacks on a MAC check requirement during the processing of malformed CBC padding, which allows remote attackers to conduct distinguishing attacks and plaintext-recovery attacks via statistical analysis of timing data for crafted packets, aka the \"Lucky Thirteen\" issue."
        },
        {
          "cve_code": "CVE-2015-3196",
          "base_score": "4.3",
          "impact_score": "2.9",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "ssl/s3_clnt.c in OpenSSL 1.0.0 before 1.0.0t, 1.0.1 before 1.0.1p, and 1.0.2 before 1.0.2d, when used for a multi-threaded client, writes the PSK identity hint to an incorrect data structure, which allows remote servers to cause a denial of service (race condition and double free) via a crafted ServerKeyExchange message."
        },
        {
          "cve_code": "CVE-2014-0221",
          "base_score": "4.3",
          "impact_score": "2.9",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "The dtls1_get_message_fragment function in d1_both.c in OpenSSL before 0.9.8za, 1.0.0 before 1.0.0m, and 1.0.1 before 1.0.1h allows remote attackers to cause a denial of service (recursion and client crash) via a DTLS hello message in an invalid DTLS handshake."
        },
        {
          "cve_code": "CVE-2014-3470",
          "base_score": "4.3",
          "impact_score": "2.9",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "The ssl3_send_client_key_exchange function in s3_clnt.c in OpenSSL before 0.9.8za, 1.0.0 before 1.0.0m, and 1.0.1 before 1.0.1h, when an anonymous ECDH cipher suite is used, allows remote attackers to cause a denial of service (NULL pointer dereference and client crash) by triggering a NULL certificate value."
        },
        {
          "cve_code": "CVE-2014-0198",
          "base_score": "4.3",
          "impact_score": "2.9",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "The do_ssl3_write function in s3_pkt.c in OpenSSL 1.x through 1.0.1g, when SSL_MODE_RELEASE_BUFFERS is enabled, does not properly manage a buffer pointer during certain recursive calls, which allows remote attackers to cause a denial of service (NULL pointer dereference and application crash) via vectors that trigger an alert condition."
        },
        {
          "cve_code": "CVE-2013-6449",
          "base_score": "4.3",
          "impact_score": "2.9",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "The ssl_get_algorithm2 function in ssl/s3_lib.c in OpenSSL before 1.0.2 obtains a certain version number from an incorrect data structure, which allows remote attackers to cause a denial of service (daemon crash) via crafted traffic from a TLS 1.2 client."
        },
        {
          "cve_code": "CVE-2013-0166",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "OpenSSL before 0.9.8y, 1.0.0 before 1.0.0k, and 1.0.1 before 1.0.1d does not properly perform signature verification for OCSP responses, which allows remote OCSP servers to cause a denial of service (NULL pointer dereference and application crash) via an invalid key."
        },
        {
          "cve_code": "CVE-2015-0293",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "The SSLv2 implementation in OpenSSL before 0.9.8zf, 1.0.0 before 1.0.0r, 1.0.1 before 1.0.1m, and 1.0.2 before 1.0.2a allows remote attackers to cause a denial of service (s2_lib.c assertion failure and daemon exit) via a crafted CLIENT-MASTER-KEY message."
        },
        {
          "cve_code": "CVE-2012-1165",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "The mime_param_cmp function in crypto/asn1/asn_mime.c in OpenSSL before 0.9.8u and 1.x before 1.0.0h allows remote attackers to cause a denial of service (NULL pointer dereference and application crash) via a crafted S/MIME message, a different vulnerability than CVE-2006-7250."
        },
        {
          "cve_code": "CVE-2012-0884",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "The implementation of Cryptographic Message Syntax (CMS) and PKCS #7 in OpenSSL before 0.9.8u and 1.x before 1.0.0h does not properly restrict certain oracle behavior, which makes it easier for context-dependent attackers to decrypt data via a Million Message Attack (MMA) adaptive chosen ciphertext attack."
        },
        {
          "cve_code": "CVE-2015-0286",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "The ASN1_TYPE_cmp function in crypto/asn1/a_type.c in OpenSSL before 0.9.8zf, 1.0.0 before 1.0.0r, 1.0.1 before 1.0.1m, and 1.0.2 before 1.0.2a does not properly perform boolean-type comparisons, which allows remote attackers to cause a denial of service (invalid read operation and application crash) via a crafted X.509 certificate to an endpoint that uses the certificate-verification feature."
        },
        {
          "cve_code": "CVE-2014-0076",
          "base_score": "1.9",
          "impact_score": "2.9",
          "exploitability_score": "3.4",
          "version": "4.0",
          "description": "The Montgomery ladder implementation in OpenSSL through 1.0.0l does not ensure that certain swap operations have a constant-time behavior, which makes it easier for local users to obtain ECDSA nonces via a FLUSH+RELOAD cache side-channel attack."
        },
        {
          "cve_code": "CVE-2015-1792",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "The do_free_upto function in crypto/cms/cms_smime.c in OpenSSL before 0.9.8zg, 1.0.0 before 1.0.0s, 1.0.1 before 1.0.1n, and 1.0.2 before 1.0.2b allows remote attackers to cause a denial of service (infinite loop) via vectors that trigger a NULL value of a BIO data structure, as demonstrated by an unrecognized X.660 OID for a hash function."
        },
        {
          "cve_code": "CVE-2015-1788",
          "base_score": "4.3",
          "impact_score": "2.9",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "The BN_GF2m_mod_inv function in crypto/bn/bn_gf2m.c in OpenSSL before 0.9.8s, 1.0.0 before 1.0.0e, 1.0.1 before 1.0.1n, and 1.0.2 before 1.0.2b does not properly handle ECParameters structures in which the curve is over a malformed binary polynomial field, which allows remote attackers to cause a denial of service (infinite loop) via a session that uses an Elliptic Curve algorithm, as demonstrated by an attack against a server that supports client authentication."
        },
        {
          "cve_code": "CVE-2015-0288",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "The X509_to_X509_REQ function in crypto/x509/x509_req.c in OpenSSL before 0.9.8zf, 1.0.0 before 1.0.0r, 1.0.1 before 1.0.1m, and 1.0.2 before 1.0.2a might allow attackers to cause a denial of service (NULL pointer dereference and application crash) via an invalid certificate key."
        },
        {
          "cve_code": "CVE-2015-0287",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "The ASN1_item_ex_d2i function in crypto/asn1/tasn_dec.c in OpenSSL before 0.9.8zf, 1.0.0 before 1.0.0r, 1.0.1 before 1.0.1m, and 1.0.2 before 1.0.2a does not reinitialize CHOICE and ADB data structures, which might allow attackers to cause a denial of service (invalid write operation and memory corruption) by leveraging an application that relies on ASN.1 structure reuse."
        },
        {
          "cve_code": "CVE-2014-3568",
          "base_score": "4.3",
          "impact_score": "2.9",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "OpenSSL before 0.9.8zc, 1.0.0 before 1.0.0o, and 1.0.1 before 1.0.1j does not properly enforce the no-ssl3 build option, which allows remote attackers to bypass intended access restrictions via an SSL 3.0 handshake, related to s23_clnt.c and s23_srvr.c."
        },
        {
          "cve_code": "CVE-2014-3511",
          "base_score": "4.3",
          "impact_score": "2.9",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "The ssl23_get_client_hello function in s23_srvr.c in OpenSSL 1.0.1 before 1.0.1i allows man-in-the-middle attackers to force the use of TLS 1.0 by triggering ClientHello message fragmentation in communication between a client and server that both support later TLS versions, related to a \"protocol downgrade\" issue."
        },
        {
          "cve_code": "CVE-2014-3508",
          "base_score": "4.3",
          "impact_score": "2.9",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "The OBJ_obj2txt function in crypto/objects/obj_dat.c in OpenSSL 0.9.8 before 0.9.8zb, 1.0.0 before 1.0.0n, and 1.0.1 before 1.0.1i, when pretty printing is used, does not ensure the presence of '\\0' characters, which allows context-dependent attackers to obtain sensitive information from process stack memory by reading output from X509_name_oneline, X509_name_print_ex, and unspecified other functions."
        },
        {
          "cve_code": "CVE-2015-0289",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "The PKCS#7 implementation in OpenSSL before 0.9.8zf, 1.0.0 before 1.0.0r, 1.0.1 before 1.0.1m, and 1.0.2 before 1.0.2a does not properly handle a lack of outer ContentInfo, which allows attackers to cause a denial of service (NULL pointer dereference and application crash) by leveraging an application that processes arbitrary PKCS#7 data and providing malformed data with ASN.1 encoding, related to crypto/pkcs7/pk7_doit.c and crypto/pkcs7/pk7_lib.c."
        },
        {
          "cve_code": "CVE-2009-1379",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "Use-after-free vulnerability in the dtls1_retrieve_buffered_fragment function in ssl/d1_both.c in OpenSSL 1.0.0 Beta 2 allows remote attackers to cause a denial of service (openssl s_client crash) and possibly have unspecified other impact via a DTLS packet, as demonstrated by a packet from a server that uses a crafted server certificate."
        },
        {
          "cve_code": "CVE-2011-0014",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "ssl/t1_lib.c in OpenSSL 0.9.8h through 0.9.8q and 1.0.0 through 1.0.0c allows remote attackers to cause a denial of service (crash), and possibly obtain sensitive information in applications that use OpenSSL, via a malformed ClientHello handshake message that triggers an out-of-bounds memory access, aka \"OCSP stapling vulnerability.\""
        },
        {
          "cve_code": "CVE-2010-4180",
          "base_score": "4.3",
          "impact_score": "2.9",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "OpenSSL before 0.9.8q, and 1.0.x before 1.0.0c, when SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG is enabled, does not properly prevent modification of the ciphersuite in the session cache, which allows remote attackers to force the downgrade to an unintended cipher via vectors involving sniffing network traffic to discover a session identifier."
        },
        {
          "cve_code": "CVE-2009-4355",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "Memory leak in the zlib_stateful_finish function in crypto/comp/c_zlib.c in OpenSSL 0.9.8l and earlier and 1.0.0 Beta through Beta 4 allows remote attackers to cause a denial of service (memory consumption) via vectors that trigger incorrect calls to the CRYPTO_cleanup_all_ex_data function, as demonstrated by use of SSLv3 and PHP with the Apache HTTP Server, a related issue to CVE-2008-1678."
        },
        {
          "cve_code": "CVE-2014-3510",
          "base_score": "4.3",
          "impact_score": "2.9",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "The ssl3_send_client_key_exchange function in s3_clnt.c in OpenSSL 0.9.8 before 0.9.8zb, 1.0.0 before 1.0.0n, and 1.0.1 before 1.0.1i allows remote DTLS servers to cause a denial of service (NULL pointer dereference and client application crash) via a crafted handshake message in conjunction with a (1) anonymous DH or (2) anonymous ECDH ciphersuite."
        },
        {
          "cve_code": "CVE-2014-3507",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "Memory leak in d1_both.c in the DTLS implementation in OpenSSL 0.9.8 before 0.9.8zb, 1.0.0 before 1.0.0n, and 1.0.1 before 1.0.1i allows remote attackers to cause a denial of service (memory consumption) via zero-length DTLS fragments that trigger improper handling of the return value of a certain insert function."
        },
        {
          "cve_code": "CVE-2014-3506",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "d1_both.c in the DTLS implementation in OpenSSL 0.9.8 before 0.9.8zb, 1.0.0 before 1.0.0n, and 1.0.1 before 1.0.1i allows remote attackers to cause a denial of service (memory consumption) via crafted DTLS handshake messages that trigger memory allocations corresponding to large length values."
        },
        {
          "cve_code": "CVE-2014-3505",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "Double free vulnerability in d1_both.c in the DTLS implementation in OpenSSL 0.9.8 before 0.9.8zb, 1.0.0 before 1.0.0n, and 1.0.1 before 1.0.1i allows remote attackers to cause a denial of service (application crash) via crafted DTLS packets that trigger an error condition."
        },
        {
          "cve_code": "CVE-2011-4619",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "The Server Gated Cryptography (SGC) implementation in OpenSSL before 0.9.8s and 1.x before 1.0.0f does not properly handle handshake restarts, which allows remote attackers to cause a denial of service (CPU consumption) via unspecified vectors."
        },
        {
          "cve_code": "CVE-2011-4576",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "The SSL 3.0 implementation in OpenSSL before 0.9.8s and 1.x before 1.0.0f does not properly initialize data structures for block cipher padding, which might allow remote attackers to obtain sensitive information by decrypting the padding data sent by an SSL peer."
        },
        {
          "cve_code": "CVE-2011-4108",
          "base_score": "4.3",
          "impact_score": "2.9",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "The DTLS implementation in OpenSSL before 0.9.8s and 1.x before 1.0.0f performs a MAC check only if certain padding is valid, which makes it easier for remote attackers to recover plaintext via a padding oracle attack."
        },
        {
          "cve_code": "CVE-2012-0027",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "The GOST ENGINE in OpenSSL before 1.0.0f does not properly handle invalid parameters for the GOST block cipher, which allows remote attackers to cause a denial of service (daemon crash) via crafted data from a TLS client."
        },
        {
          "cve_code": "CVE-2011-4577",
          "base_score": "4.3",
          "impact_score": "2.9",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "OpenSSL before 0.9.8s and 1.x before 1.0.0f, when RFC 3779 support is enabled, allows remote attackers to cause a denial of service (assertion failure) via an X.509 certificate containing certificate-extension data associated with (1) IP address blocks or (2) Autonomous System (AS) identifiers."
        },
        {
          "cve_code": "CVE-2011-3210",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "The ephemeral ECDH ciphersuite functionality in OpenSSL 0.9.8 through 0.9.8r and 1.0.x before 1.0.0e does not ensure thread safety during processing of handshake messages from clients, which allows remote attackers to cause a denial of service (daemon crash) via out-of-order messages that violate the TLS protocol."
        },
        {
          "cve_code": "CVE-2011-3207",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "crypto/x509/x509_vfy.c in OpenSSL 1.0.x before 1.0.0e does not initialize certain structure members, which makes it easier for remote attackers to bypass CRL validation by using a nextUpdate value corresponding to a time in the past."
        },
        {
          "cve_code": "CVE-2011-1945",
          "base_score": "2.6",
          "impact_score": "2.9",
          "exploitability_score": "4.9",
          "version": "4.0",
          "description": "The elliptic curve cryptography (ECC) subsystem in OpenSSL 1.0.0d and earlier, when the Elliptic Curve Digital Signature Algorithm (ECDSA) is used for the ECDHE_ECDSA cipher suite, does not properly implement curves over binary fields, which makes it easier for context-dependent attackers to determine private keys via a timing attack and a lattice calculation."
        }
      ],
      "uid_affected": [
        "201ac67dd9abe5826f687f02526d3ae616d28a8b4a1bca0c451be66b93b539ea_2034604"
      ],
      "hid_affected": [
        "/bin/WTP"
      ]
    },
    {
      "cpe_name": "OpenSSL 1.0.0 (CRITICAL)",
      "cve_count": 0,
      "base_score": 3,
      "exploitability_score": 3,
      "impact_score": 3,
      "all_cve_objects_bs": [
        {
          "cve_code": "CVE-2014-3566",
          "base_score": "3.4",
          "impact_score": "1.4",
          "exploitability_score": "1.6",
          "attackVector": "NETWORK",
          "baseSeverity": "LOW",
          "attackComplexity": "HIGH",
          "version": "4.0",
          "description": "The SSL protocol 3.0, as used in OpenSSL through 1.0.1i and other products, uses nondeterministic CBC padding, which makes it easier for man-in-the-middle attackers to obtain cleartext data via a padding-oracle attack, aka the \"POODLE\" issue."
        },
        {
          "cve_code": "CVE-2015-4000",
          "base_score": "3.7",
          "impact_score": "1.4",
          "exploitability_score": "2.2",
          "attackVector": "NETWORK",
          "baseSeverity": "LOW",
          "attackComplexity": "HIGH",
          "version": "4.0",
          "description": "The TLS protocol 1.2 and earlier, when a DHE_EXPORT ciphersuite is enabled on a server but not on a client, does not properly convey a DHE_EXPORT choice, which allows man-in-the-middle attackers to conduct cipher-downgrade attacks by rewriting a ClientHello with DHE replaced by DHE_EXPORT and then rewriting a ServerHello with DHE_EXPORT replaced by DHE, aka the \"Logjam\" issue."
        }
      ],
      "all_cve_objects_es": [
        {
          "cve_code": "CVE-2015-1789",
          "base_score": "7.5",
          "impact_score": "3.6",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "The X509_cmp_time function in crypto/x509/x509_vfy.c in OpenSSL before 0.9.8zg, 1.0.0 before 1.0.0s, 1.0.1 before 1.0.1n, and 1.0.2 before 1.0.2b allows remote attackers to cause a denial of service (out-of-bounds read and application crash) via a crafted length field in ASN1_TIME data, as demonstrated by an attack against a server that supports client authentication with a custom verification callback."
        },
        {
          "cve_code": "CVE-2020-7042",
          "base_score": "5.3",
          "impact_score": "1.4",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "MEDIUM",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "An issue was discovered in openfortivpn 1.11.0 when used with OpenSSL 1.0.2 or later. tunnel.c mishandles certificate validation because the hostname check operates on uninitialized memory. The outcome is that a valid certificate is never accepted (only a malformed certificate may be accepted)."
        },
        {
          "cve_code": "CVE-2017-3735",
          "base_score": "5.3",
          "impact_score": "1.4",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "MEDIUM",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "While parsing an IPAddressFamily extension in an X.509 certificate, it is possible to do a one-byte overread. This would result in an incorrect text display of the certificate. This bug has been present since 2006 and is present in all versions of OpenSSL before 1.0.2m and 1.1.0g."
        },
        {
          "cve_code": "CVE-2015-3195",
          "base_score": "5.3",
          "impact_score": "1.4",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "MEDIUM",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "The ASN1_TFLG_COMBINE implementation in crypto/asn1/tasn_dec.c in OpenSSL before 0.9.8zh, 1.0.0 before 1.0.0t, 1.0.1 before 1.0.1q, and 1.0.2 before 1.0.2e mishandles errors caused by malformed X509_ATTRIBUTE data, which allows remote attackers to obtain sensitive information from process memory by triggering a decoding failure in a PKCS#7 or CMS application."
        },
        {
          "cve_code": "CVE-2020-7041",
          "base_score": "5.3",
          "impact_score": "1.4",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "MEDIUM",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "An issue was discovered in openfortivpn 1.11.0 when used with OpenSSL 1.0.2 or later. tunnel.c mishandles certificate validation because an X509_check_host negative error code is interpreted as a successful return value."
        },
        {
          "cve_code": "CVE-2020-7043",
          "base_score": "9.1",
          "impact_score": "5.2",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "CRITICAL",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "An issue was discovered in openfortivpn 1.11.0 when used with OpenSSL before 1.0.2. tunnel.c mishandles certificate validation because hostname comparisons do not consider '\\0' characters, as demonstrated by a good.example.com\\x00evil.example.com attack."
        },
        {
          "cve_code": "CVE-2007-5536",
          "base_score": "4.9",
          "impact_score": "6.9",
          "exploitability_score": "3.9",
          "version": "4.0",
          "description": "Unspecified vulnerability in OpenSSL before A.00.09.07l on HP-UX B.11.11, B.11.23, and B.11.31 allows local users to cause a denial of service via unspecified vectors."
        },
        {
          "cve_code": "CVE-2016-2176",
          "base_score": "8.2",
          "impact_score": "4.2",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "The X509_NAME_oneline function in crypto/x509/x509_obj.c in OpenSSL before 1.0.1t and 1.0.2 before 1.0.2h allows remote attackers to obtain sensitive information from process stack memory or cause a denial of service (buffer over-read) via crafted EBCDIC ASN.1 data."
        },
        {
          "cve_code": "CVE-2016-2109",
          "base_score": "7.5",
          "impact_score": "3.6",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "The asn1_d2i_read_bio function in crypto/asn1/a_d2i_fp.c in the ASN.1 BIO implementation in OpenSSL before 1.0.1t and 1.0.2 before 1.0.2h allows remote attackers to cause a denial of service (memory consumption) via a short invalid encoding."
        },
        {
          "cve_code": "CVE-2016-2106",
          "base_score": "7.5",
          "impact_score": "3.6",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "Integer overflow in the EVP_EncryptUpdate function in crypto/evp/evp_enc.c in OpenSSL before 1.0.1t and 1.0.2 before 1.0.2h allows remote attackers to cause a denial of service (heap memory corruption) via a large amount of data."
        },
        {
          "cve_code": "CVE-2016-2108",
          "base_score": "9.8",
          "impact_score": "5.9",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "CRITICAL",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "The ASN.1 implementation in OpenSSL before 1.0.1o and 1.0.2 before 1.0.2c allows remote attackers to execute arbitrary code or cause a denial of service (buffer underflow and memory corruption) via an ANY field in crafted serialized data, aka the \"negative zero\" issue."
        },
        {
          "cve_code": "CVE-2014-0076",
          "base_score": "1.9",
          "impact_score": "2.9",
          "exploitability_score": "3.4",
          "version": "4.0",
          "description": "The Montgomery ladder implementation in OpenSSL through 1.0.0l does not ensure that certain swap operations have a constant-time behavior, which makes it easier for local users to obtain ECDSA nonces via a FLUSH+RELOAD cache side-channel attack."
        }
      ],
      "all_cve_objects_is": [
        {
          "cve_code": "CVE-2015-1789",
          "base_score": "7.5",
          "impact_score": "3.6",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "The X509_cmp_time function in crypto/x509/x509_vfy.c in OpenSSL before 0.9.8zg, 1.0.0 before 1.0.0s, 1.0.1 before 1.0.1n, and 1.0.2 before 1.0.2b allows remote attackers to cause a denial of service (out-of-bounds read and application crash) via a crafted length field in ASN1_TIME data, as demonstrated by an attack against a server that supports client authentication with a custom verification callback."
        },
        {
          "cve_code": "CVE-2016-7056",
          "base_score": "5.5",
          "impact_score": "3.6",
          "exploitability_score": "1.8",
          "attackVector": "LOCAL",
          "baseSeverity": "MEDIUM",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "A timing attack flaw was found in OpenSSL 1.0.1u and before that could allow a malicious user with local access to recover ECDSA P-256 private keys."
        },
        {
          "cve_code": "CVE-2016-2107",
          "base_score": "5.9",
          "impact_score": "3.6",
          "exploitability_score": "2.2",
          "attackVector": "NETWORK",
          "baseSeverity": "MEDIUM",
          "attackComplexity": "HIGH",
          "version": "4.0",
          "description": "The AES-NI implementation in OpenSSL before 1.0.1t and 1.0.2 before 1.0.2h does not consider memory allocation during a certain padding check, which allows remote attackers to obtain sensitive cleartext information via a padding-oracle attack against an AES CBC session. NOTE: this vulnerability exists because of an incorrect fix for CVE-2013-0169."
        },
        {
          "cve_code": "CVE-2016-2109",
          "base_score": "7.5",
          "impact_score": "3.6",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "The asn1_d2i_read_bio function in crypto/asn1/a_d2i_fp.c in the ASN.1 BIO implementation in OpenSSL before 1.0.1t and 1.0.2 before 1.0.2h allows remote attackers to cause a denial of service (memory consumption) via a short invalid encoding."
        },
        {
          "cve_code": "CVE-2016-2106",
          "base_score": "7.5",
          "impact_score": "3.6",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "Integer overflow in the EVP_EncryptUpdate function in crypto/evp/evp_enc.c in OpenSSL before 1.0.1t and 1.0.2 before 1.0.2h allows remote attackers to cause a denial of service (heap memory corruption) via a large amount of data."
        },
        {
          "cve_code": "CVE-2016-0704",
          "base_score": "5.9",
          "impact_score": "3.6",
          "exploitability_score": "2.2",
          "attackVector": "NETWORK",
          "baseSeverity": "MEDIUM",
          "attackComplexity": "HIGH",
          "version": "4.0",
          "description": "An oracle protection mechanism in the get_client_master_key function in s2_srvr.c in the SSLv2 implementation in OpenSSL before 0.9.8zf, 1.0.0 before 1.0.0r, 1.0.1 before 1.0.1m, and 1.0.2 before 1.0.2a overwrites incorrect MASTER-KEY bytes during use of export cipher suites, which makes it easier for remote attackers to decrypt TLS ciphertext data by leveraging a Bleichenbacher RSA padding oracle, a related issue to CVE-2016-0800."
        },
        {
          "cve_code": "CVE-2016-0703",
          "base_score": "5.9",
          "impact_score": "3.6",
          "exploitability_score": "2.2",
          "attackVector": "NETWORK",
          "baseSeverity": "MEDIUM",
          "attackComplexity": "HIGH",
          "version": "4.0",
          "description": "The get_client_master_key function in s2_srvr.c in the SSLv2 implementation in OpenSSL before 0.9.8zf, 1.0.0 before 1.0.0r, 1.0.1 before 1.0.1m, and 1.0.2 before 1.0.2a accepts a nonzero CLIENT-MASTER-KEY CLEAR-KEY-LENGTH value for an arbitrary cipher, which allows man-in-the-middle attackers to determine the MASTER-KEY value and decrypt TLS ciphertext data by leveraging a Bleichenbacher RSA padding oracle, a related issue to CVE-2016-0800."
        }
      ],
      "uid_affected": [
        "201ac67dd9abe5826f687f02526d3ae616d28a8b4a1bca0c451be66b93b539ea_2034604"
      ],
      "hid_affected": [
        "/bin/WTP"
      ]
    },
    {
      "cpe_name": "OpenSSL 1.0.0 (CRITICAL)",
      "cve_count": 0,
      "base_score": 4,
      "exploitability_score": 4,
      "impact_score": 4,
      "all_cve_objects_bs": [
        {
          "cve_code": "CVE-2007-5536",
          "base_score": "4.9",
          "impact_score": "6.9",
          "exploitability_score": "3.9",
          "version": "4.0",
          "description": "Unspecified vulnerability in OpenSSL before A.00.09.07l on HP-UX B.11.11, B.11.23, and B.11.31 allows local users to cause a denial of service via unspecified vectors."
        },
        {
          "cve_code": "CVE-2015-3196",
          "base_score": "4.3",
          "impact_score": "2.9",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "ssl/s3_clnt.c in OpenSSL 1.0.0 before 1.0.0t, 1.0.1 before 1.0.1p, and 1.0.2 before 1.0.2d, when used for a multi-threaded client, writes the PSK identity hint to an incorrect data structure, which allows remote servers to cause a denial of service (race condition and double free) via a crafted ServerKeyExchange message."
        },
        {
          "cve_code": "CVE-2014-0221",
          "base_score": "4.3",
          "impact_score": "2.9",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "The dtls1_get_message_fragment function in d1_both.c in OpenSSL before 0.9.8za, 1.0.0 before 1.0.0m, and 1.0.1 before 1.0.1h allows remote attackers to cause a denial of service (recursion and client crash) via a DTLS hello message in an invalid DTLS handshake."
        },
        {
          "cve_code": "CVE-2014-3470",
          "base_score": "4.3",
          "impact_score": "2.9",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "The ssl3_send_client_key_exchange function in s3_clnt.c in OpenSSL before 0.9.8za, 1.0.0 before 1.0.0m, and 1.0.1 before 1.0.1h, when an anonymous ECDH cipher suite is used, allows remote attackers to cause a denial of service (NULL pointer dereference and client crash) by triggering a NULL certificate value."
        },
        {
          "cve_code": "CVE-2010-5298",
          "base_score": "4",
          "impact_score": "4.9",
          "exploitability_score": "4.9",
          "version": "4.0",
          "description": "Race condition in the ssl3_read_bytes function in s3_pkt.c in OpenSSL through 1.0.1g, when SSL_MODE_RELEASE_BUFFERS is enabled, allows remote attackers to inject data across sessions or cause a denial of service (use-after-free and parsing error) via an SSL connection in a multithreaded environment."
        },
        {
          "cve_code": "CVE-2014-0198",
          "base_score": "4.3",
          "impact_score": "2.9",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "The do_ssl3_write function in s3_pkt.c in OpenSSL 1.x through 1.0.1g, when SSL_MODE_RELEASE_BUFFERS is enabled, does not properly manage a buffer pointer during certain recursive calls, which allows remote attackers to cause a denial of service (NULL pointer dereference and application crash) via vectors that trigger an alert condition."
        },
        {
          "cve_code": "CVE-2013-6449",
          "base_score": "4.3",
          "impact_score": "2.9",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "The ssl_get_algorithm2 function in ssl/s3_lib.c in OpenSSL before 1.0.2 obtains a certain version number from an incorrect data structure, which allows remote attackers to cause a denial of service (daemon crash) via crafted traffic from a TLS 1.2 client."
        },
        {
          "cve_code": "CVE-2015-1788",
          "base_score": "4.3",
          "impact_score": "2.9",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "The BN_GF2m_mod_inv function in crypto/bn/bn_gf2m.c in OpenSSL before 0.9.8s, 1.0.0 before 1.0.0e, 1.0.1 before 1.0.1n, and 1.0.2 before 1.0.2b does not properly handle ECParameters structures in which the curve is over a malformed binary polynomial field, which allows remote attackers to cause a denial of service (infinite loop) via a session that uses an Elliptic Curve algorithm, as demonstrated by an attack against a server that supports client authentication."
        },
        {
          "cve_code": "CVE-2014-3568",
          "base_score": "4.3",
          "impact_score": "2.9",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "OpenSSL before 0.9.8zc, 1.0.0 before 1.0.0o, and 1.0.1 before 1.0.1j does not properly enforce the no-ssl3 build option, which allows remote attackers to bypass intended access restrictions via an SSL 3.0 handshake, related to s23_clnt.c and s23_srvr.c."
        },
        {
          "cve_code": "CVE-2014-3511",
          "base_score": "4.3",
          "impact_score": "2.9",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "The ssl23_get_client_hello function in s23_srvr.c in OpenSSL 1.0.1 before 1.0.1i allows man-in-the-middle attackers to force the use of TLS 1.0 by triggering ClientHello message fragmentation in communication between a client and server that both support later TLS versions, related to a \"protocol downgrade\" issue."
        },
        {
          "cve_code": "CVE-2014-3508",
          "base_score": "4.3",
          "impact_score": "2.9",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "The OBJ_obj2txt function in crypto/objects/obj_dat.c in OpenSSL 0.9.8 before 0.9.8zb, 1.0.0 before 1.0.0n, and 1.0.1 before 1.0.1i, when pretty printing is used, does not ensure the presence of '\\0' characters, which allows context-dependent attackers to obtain sensitive information from process stack memory by reading output from X509_name_oneline, X509_name_print_ex, and unspecified other functions."
        },
        {
          "cve_code": "CVE-2010-4180",
          "base_score": "4.3",
          "impact_score": "2.9",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "OpenSSL before 0.9.8q, and 1.0.x before 1.0.0c, when SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG is enabled, does not properly prevent modification of the ciphersuite in the session cache, which allows remote attackers to force the downgrade to an unintended cipher via vectors involving sniffing network traffic to discover a session identifier."
        },
        {
          "cve_code": "CVE-2014-3510",
          "base_score": "4.3",
          "impact_score": "2.9",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "The ssl3_send_client_key_exchange function in s3_clnt.c in OpenSSL 0.9.8 before 0.9.8zb, 1.0.0 before 1.0.0n, and 1.0.1 before 1.0.1i allows remote DTLS servers to cause a denial of service (NULL pointer dereference and client application crash) via a crafted handshake message in conjunction with a (1) anonymous DH or (2) anonymous ECDH ciphersuite."
        },
        {
          "cve_code": "CVE-2011-4108",
          "base_score": "4.3",
          "impact_score": "2.9",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "The DTLS implementation in OpenSSL before 0.9.8s and 1.x before 1.0.0f performs a MAC check only if certain padding is valid, which makes it easier for remote attackers to recover plaintext via a padding oracle attack."
        },
        {
          "cve_code": "CVE-2011-4577",
          "base_score": "4.3",
          "impact_score": "2.9",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "OpenSSL before 0.9.8s and 1.x before 1.0.0f, when RFC 3779 support is enabled, allows remote attackers to cause a denial of service (assertion failure) via an X.509 certificate containing certificate-extension data associated with (1) IP address blocks or (2) Autonomous System (AS) identifiers."
        }
      ],
      "all_cve_objects_es": [
        {
          "cve_code": "CVE-2013-0169",
          "base_score": "2.6",
          "impact_score": "2.9",
          "exploitability_score": "4.9",
          "version": "4.0",
          "description": "The TLS protocol 1.1 and 1.2 and the DTLS protocol 1.0 and 1.2, as used in OpenSSL, OpenJDK, PolarSSL, and other products, do not properly consider timing side-channel attacks on a MAC check requirement during the processing of malformed CBC padding, which allows remote attackers to conduct distinguishing attacks and plaintext-recovery attacks via statistical analysis of timing data for crafted packets, aka the \"Lucky Thirteen\" issue."
        },
        {
          "cve_code": "CVE-2010-5298",
          "base_score": "4",
          "impact_score": "4.9",
          "exploitability_score": "4.9",
          "version": "4.0",
          "description": "Race condition in the ssl3_read_bytes function in s3_pkt.c in OpenSSL through 1.0.1g, when SSL_MODE_RELEASE_BUFFERS is enabled, allows remote attackers to inject data across sessions or cause a denial of service (use-after-free and parsing error) via an SSL connection in a multithreaded environment."
        },
        {
          "cve_code": "CVE-2010-3864",
          "base_score": "7.6",
          "impact_score": "10",
          "exploitability_score": "4.9",
          "version": "4.0",
          "description": "Multiple race conditions in ssl/t1_lib.c in OpenSSL 0.9.8f through 0.9.8o, 1.0.0, and 1.0.0a, when multi-threading and internal caching are enabled on a TLS server, might allow remote attackers to execute arbitrary code via client data that triggers a heap-based buffer overflow, related to (1) the TLS server name extension and (2) elliptic curve cryptography."
        },
        {
          "cve_code": "CVE-2011-1945",
          "base_score": "2.6",
          "impact_score": "2.9",
          "exploitability_score": "4.9",
          "version": "4.0",
          "description": "The elliptic curve cryptography (ECC) subsystem in OpenSSL 1.0.0d and earlier, when the Elliptic Curve Digital Signature Algorithm (ECDSA) is used for the ECDHE_ECDSA cipher suite, does not properly implement curves over binary fields, which makes it easier for context-dependent attackers to determine private keys via a timing attack and a lattice calculation."
        }
      ],
      "all_cve_objects_is": [
        {
          "cve_code": "CVE-2010-5298",
          "base_score": "4",
          "impact_score": "4.9",
          "exploitability_score": "4.9",
          "version": "4.0",
          "description": "Race condition in the ssl3_read_bytes function in s3_pkt.c in OpenSSL through 1.0.1g, when SSL_MODE_RELEASE_BUFFERS is enabled, allows remote attackers to inject data across sessions or cause a denial of service (use-after-free and parsing error) via an SSL connection in a multithreaded environment."
        },
        {
          "cve_code": "CVE-2013-6450",
          "base_score": "5.8",
          "impact_score": "4.9",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "The DTLS retransmission implementation in OpenSSL 1.0.0 before 1.0.0l and 1.0.1 before 1.0.1f does not properly maintain data structures for digest and encryption contexts, which might allow man-in-the-middle attackers to trigger the use of a different context and cause a denial of service (application crash) by interfering with packet delivery, related to ssl/d1_both.c and ssl/t1_enc.c."
        },
        {
          "cve_code": "CVE-2016-2176",
          "base_score": "8.2",
          "impact_score": "4.2",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "The X509_NAME_oneline function in crypto/x509/x509_obj.c in OpenSSL before 1.0.1t and 1.0.2 before 1.0.2h allows remote attackers to obtain sensitive information from process stack memory or cause a denial of service (buffer over-read) via crafted EBCDIC ASN.1 data."
        },
        {
          "cve_code": "CVE-2010-1633",
          "base_score": "6.4",
          "impact_score": "4.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "RSA verification recovery in the EVP_PKEY_verify_recover function in OpenSSL 1.x before 1.0.0a, as used by pkeyutl and possibly other applications, returns uninitialized memory upon failure, which might allow context-dependent attackers to bypass intended key requirements or obtain sensitive information via unspecified vectors.  NOTE: some of these details are obtained from third party information."
        }
      ],
      "uid_affected": [
        "201ac67dd9abe5826f687f02526d3ae616d28a8b4a1bca0c451be66b93b539ea_2034604"
      ],
      "hid_affected": [
        "/bin/WTP"
      ]
    },
    {
      "cpe_name": "OpenSSL 1.0.0 (CRITICAL)",
      "cve_count": 0,
      "base_score": 5,
      "exploitability_score": 5,
      "impact_score": 5,
      "all_cve_objects_bs": [
        {
          "cve_code": "CVE-2015-1790",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "The PKCS7_dataDecodefunction in crypto/pkcs7/pk7_doit.c in OpenSSL before 0.9.8zg, 1.0.0 before 1.0.0s, 1.0.1 before 1.0.1n, and 1.0.2 before 1.0.2b allows remote attackers to cause a denial of service (NULL pointer dereference and application crash) via a PKCS#7 blob that uses ASN.1 encoding and lacks inner EncryptedContent data."
        },
        {
          "cve_code": "CVE-2020-7042",
          "base_score": "5.3",
          "impact_score": "1.4",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "MEDIUM",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "An issue was discovered in openfortivpn 1.11.0 when used with OpenSSL 1.0.2 or later. tunnel.c mishandles certificate validation because the hostname check operates on uninitialized memory. The outcome is that a valid certificate is never accepted (only a malformed certificate may be accepted)."
        },
        {
          "cve_code": "CVE-2017-3735",
          "base_score": "5.3",
          "impact_score": "1.4",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "MEDIUM",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "While parsing an IPAddressFamily extension in an X.509 certificate, it is possible to do a one-byte overread. This would result in an incorrect text display of the certificate. This bug has been present since 2006 and is present in all versions of OpenSSL before 1.0.2m and 1.1.0g."
        },
        {
          "cve_code": "CVE-2015-3195",
          "base_score": "5.3",
          "impact_score": "1.4",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "MEDIUM",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "The ASN1_TFLG_COMBINE implementation in crypto/asn1/tasn_dec.c in OpenSSL before 0.9.8zh, 1.0.0 before 1.0.0t, 1.0.1 before 1.0.1q, and 1.0.2 before 1.0.2e mishandles errors caused by malformed X509_ATTRIBUTE data, which allows remote attackers to obtain sensitive information from process memory by triggering a decoding failure in a PKCS#7 or CMS application."
        },
        {
          "cve_code": "CVE-2020-7041",
          "base_score": "5.3",
          "impact_score": "1.4",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "MEDIUM",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "An issue was discovered in openfortivpn 1.11.0 when used with OpenSSL 1.0.2 or later. tunnel.c mishandles certificate validation because an X509_check_host negative error code is interpreted as a successful return value."
        },
        {
          "cve_code": "CVE-2016-7056",
          "base_score": "5.5",
          "impact_score": "3.6",
          "exploitability_score": "1.8",
          "attackVector": "LOCAL",
          "baseSeverity": "MEDIUM",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "A timing attack flaw was found in OpenSSL 1.0.1u and before that could allow a malicious user with local access to recover ECDSA P-256 private keys."
        },
        {
          "cve_code": "CVE-2016-2107",
          "base_score": "5.9",
          "impact_score": "3.6",
          "exploitability_score": "2.2",
          "attackVector": "NETWORK",
          "baseSeverity": "MEDIUM",
          "attackComplexity": "HIGH",
          "version": "4.0",
          "description": "The AES-NI implementation in OpenSSL before 1.0.1t and 1.0.2 before 1.0.2h does not consider memory allocation during a certain padding check, which allows remote attackers to obtain sensitive cleartext information via a padding-oracle attack against an AES CBC session. NOTE: this vulnerability exists because of an incorrect fix for CVE-2013-0169."
        },
        {
          "cve_code": "CVE-2013-6450",
          "base_score": "5.8",
          "impact_score": "4.9",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "The DTLS retransmission implementation in OpenSSL 1.0.0 before 1.0.0l and 1.0.1 before 1.0.1f does not properly maintain data structures for digest and encryption contexts, which might allow man-in-the-middle attackers to trigger the use of a different context and cause a denial of service (application crash) by interfering with packet delivery, related to ssl/d1_both.c and ssl/t1_enc.c."
        },
        {
          "cve_code": "CVE-2013-0166",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "OpenSSL before 0.9.8y, 1.0.0 before 1.0.0k, and 1.0.1 before 1.0.1d does not properly perform signature verification for OCSP responses, which allows remote OCSP servers to cause a denial of service (NULL pointer dereference and application crash) via an invalid key."
        },
        {
          "cve_code": "CVE-2016-0704",
          "base_score": "5.9",
          "impact_score": "3.6",
          "exploitability_score": "2.2",
          "attackVector": "NETWORK",
          "baseSeverity": "MEDIUM",
          "attackComplexity": "HIGH",
          "version": "4.0",
          "description": "An oracle protection mechanism in the get_client_master_key function in s2_srvr.c in the SSLv2 implementation in OpenSSL before 0.9.8zf, 1.0.0 before 1.0.0r, 1.0.1 before 1.0.1m, and 1.0.2 before 1.0.2a overwrites incorrect MASTER-KEY bytes during use of export cipher suites, which makes it easier for remote attackers to decrypt TLS ciphertext data by leveraging a Bleichenbacher RSA padding oracle, a related issue to CVE-2016-0800."
        },
        {
          "cve_code": "CVE-2016-0703",
          "base_score": "5.9",
          "impact_score": "3.6",
          "exploitability_score": "2.2",
          "attackVector": "NETWORK",
          "baseSeverity": "MEDIUM",
          "attackComplexity": "HIGH",
          "version": "4.0",
          "description": "The get_client_master_key function in s2_srvr.c in the SSLv2 implementation in OpenSSL before 0.9.8zf, 1.0.0 before 1.0.0r, 1.0.1 before 1.0.1m, and 1.0.2 before 1.0.2a accepts a nonzero CLIENT-MASTER-KEY CLEAR-KEY-LENGTH value for an arbitrary cipher, which allows man-in-the-middle attackers to determine the MASTER-KEY value and decrypt TLS ciphertext data by leveraging a Bleichenbacher RSA padding oracle, a related issue to CVE-2016-0800."
        },
        {
          "cve_code": "CVE-2015-0293",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "The SSLv2 implementation in OpenSSL before 0.9.8zf, 1.0.0 before 1.0.0r, 1.0.1 before 1.0.1m, and 1.0.2 before 1.0.2a allows remote attackers to cause a denial of service (s2_lib.c assertion failure and daemon exit) via a crafted CLIENT-MASTER-KEY message."
        },
        {
          "cve_code": "CVE-2012-1165",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "The mime_param_cmp function in crypto/asn1/asn_mime.c in OpenSSL before 0.9.8u and 1.x before 1.0.0h allows remote attackers to cause a denial of service (NULL pointer dereference and application crash) via a crafted S/MIME message, a different vulnerability than CVE-2006-7250."
        },
        {
          "cve_code": "CVE-2012-0884",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "The implementation of Cryptographic Message Syntax (CMS) and PKCS #7 in OpenSSL before 0.9.8u and 1.x before 1.0.0h does not properly restrict certain oracle behavior, which makes it easier for context-dependent attackers to decrypt data via a Million Message Attack (MMA) adaptive chosen ciphertext attack."
        },
        {
          "cve_code": "CVE-2015-0286",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "The ASN1_TYPE_cmp function in crypto/asn1/a_type.c in OpenSSL before 0.9.8zf, 1.0.0 before 1.0.0r, 1.0.1 before 1.0.1m, and 1.0.2 before 1.0.2a does not properly perform boolean-type comparisons, which allows remote attackers to cause a denial of service (invalid read operation and application crash) via a crafted X.509 certificate to an endpoint that uses the certificate-verification feature."
        },
        {
          "cve_code": "CVE-2015-1792",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "The do_free_upto function in crypto/cms/cms_smime.c in OpenSSL before 0.9.8zg, 1.0.0 before 1.0.0s, 1.0.1 before 1.0.1n, and 1.0.2 before 1.0.2b allows remote attackers to cause a denial of service (infinite loop) via vectors that trigger a NULL value of a BIO data structure, as demonstrated by an unrecognized X.660 OID for a hash function."
        },
        {
          "cve_code": "CVE-2015-0288",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "The X509_to_X509_REQ function in crypto/x509/x509_req.c in OpenSSL before 0.9.8zf, 1.0.0 before 1.0.0r, 1.0.1 before 1.0.1m, and 1.0.2 before 1.0.2a might allow attackers to cause a denial of service (NULL pointer dereference and application crash) via an invalid certificate key."
        },
        {
          "cve_code": "CVE-2015-0287",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "The ASN1_item_ex_d2i function in crypto/asn1/tasn_dec.c in OpenSSL before 0.9.8zf, 1.0.0 before 1.0.0r, 1.0.1 before 1.0.1m, and 1.0.2 before 1.0.2a does not reinitialize CHOICE and ADB data structures, which might allow attackers to cause a denial of service (invalid write operation and memory corruption) by leveraging an application that relies on ASN.1 structure reuse."
        },
        {
          "cve_code": "CVE-2015-0289",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "The PKCS#7 implementation in OpenSSL before 0.9.8zf, 1.0.0 before 1.0.0r, 1.0.1 before 1.0.1m, and 1.0.2 before 1.0.2a does not properly handle a lack of outer ContentInfo, which allows attackers to cause a denial of service (NULL pointer dereference and application crash) by leveraging an application that processes arbitrary PKCS#7 data and providing malformed data with ASN.1 encoding, related to crypto/pkcs7/pk7_doit.c and crypto/pkcs7/pk7_lib.c."
        },
        {
          "cve_code": "CVE-2009-1379",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "Use-after-free vulnerability in the dtls1_retrieve_buffered_fragment function in ssl/d1_both.c in OpenSSL 1.0.0 Beta 2 allows remote attackers to cause a denial of service (openssl s_client crash) and possibly have unspecified other impact via a DTLS packet, as demonstrated by a packet from a server that uses a crafted server certificate."
        },
        {
          "cve_code": "CVE-2011-0014",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "ssl/t1_lib.c in OpenSSL 0.9.8h through 0.9.8q and 1.0.0 through 1.0.0c allows remote attackers to cause a denial of service (crash), and possibly obtain sensitive information in applications that use OpenSSL, via a malformed ClientHello handshake message that triggers an out-of-bounds memory access, aka \"OCSP stapling vulnerability.\""
        },
        {
          "cve_code": "CVE-2009-4355",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "Memory leak in the zlib_stateful_finish function in crypto/comp/c_zlib.c in OpenSSL 0.9.8l and earlier and 1.0.0 Beta through Beta 4 allows remote attackers to cause a denial of service (memory consumption) via vectors that trigger incorrect calls to the CRYPTO_cleanup_all_ex_data function, as demonstrated by use of SSLv3 and PHP with the Apache HTTP Server, a related issue to CVE-2008-1678."
        },
        {
          "cve_code": "CVE-2014-3507",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "Memory leak in d1_both.c in the DTLS implementation in OpenSSL 0.9.8 before 0.9.8zb, 1.0.0 before 1.0.0n, and 1.0.1 before 1.0.1i allows remote attackers to cause a denial of service (memory consumption) via zero-length DTLS fragments that trigger improper handling of the return value of a certain insert function."
        },
        {
          "cve_code": "CVE-2014-3506",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "d1_both.c in the DTLS implementation in OpenSSL 0.9.8 before 0.9.8zb, 1.0.0 before 1.0.0n, and 1.0.1 before 1.0.1i allows remote attackers to cause a denial of service (memory consumption) via crafted DTLS handshake messages that trigger memory allocations corresponding to large length values."
        },
        {
          "cve_code": "CVE-2014-3505",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "Double free vulnerability in d1_both.c in the DTLS implementation in OpenSSL 0.9.8 before 0.9.8zb, 1.0.0 before 1.0.0n, and 1.0.1 before 1.0.1i allows remote attackers to cause a denial of service (application crash) via crafted DTLS packets that trigger an error condition."
        },
        {
          "cve_code": "CVE-2011-4619",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "The Server Gated Cryptography (SGC) implementation in OpenSSL before 0.9.8s and 1.x before 1.0.0f does not properly handle handshake restarts, which allows remote attackers to cause a denial of service (CPU consumption) via unspecified vectors."
        },
        {
          "cve_code": "CVE-2011-4576",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "The SSL 3.0 implementation in OpenSSL before 0.9.8s and 1.x before 1.0.0f does not properly initialize data structures for block cipher padding, which might allow remote attackers to obtain sensitive information by decrypting the padding data sent by an SSL peer."
        },
        {
          "cve_code": "CVE-2012-0027",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "The GOST ENGINE in OpenSSL before 1.0.0f does not properly handle invalid parameters for the GOST block cipher, which allows remote attackers to cause a denial of service (daemon crash) via crafted data from a TLS client."
        },
        {
          "cve_code": "CVE-2011-3210",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "The ephemeral ECDH ciphersuite functionality in OpenSSL 0.9.8 through 0.9.8r and 1.0.x before 1.0.0e does not ensure thread safety during processing of handshake messages from clients, which allows remote attackers to cause a denial of service (daemon crash) via out-of-order messages that violate the TLS protocol."
        },
        {
          "cve_code": "CVE-2011-3207",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "crypto/x509/x509_vfy.c in OpenSSL 1.0.x before 1.0.0e does not initialize certain structure members, which makes it easier for remote attackers to bypass CRL validation by using a nextUpdate value corresponding to a time in the past."
        }
      ],
      "all_cve_objects_es": [],
      "all_cve_objects_is": [
        {
          "cve_code": "CVE-2014-0224",
          "base_score": "7.4",
          "impact_score": "5.2",
          "exploitability_score": "2.2",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "HIGH",
          "version": "4.0",
          "description": "OpenSSL before 0.9.8za, 1.0.0 before 1.0.0m, and 1.0.1 before 1.0.1h does not properly restrict processing of ChangeCipherSpec messages, which allows man-in-the-middle attackers to trigger use of a zero-length master key in certain OpenSSL-to-OpenSSL communications, and consequently hijack sessions or obtain sensitive information, via a crafted TLS handshake, aka the \"CCS Injection\" vulnerability."
        },
        {
          "cve_code": "CVE-2020-7043",
          "base_score": "9.1",
          "impact_score": "5.2",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "CRITICAL",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "An issue was discovered in openfortivpn 1.11.0 when used with OpenSSL before 1.0.2. tunnel.c mishandles certificate validation because hostname comparisons do not consider '\\0' characters, as demonstrated by a good.example.com\\x00evil.example.com attack."
        },
        {
          "cve_code": "CVE-2016-2108",
          "base_score": "9.8",
          "impact_score": "5.9",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "CRITICAL",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "The ASN.1 implementation in OpenSSL before 1.0.1o and 1.0.2 before 1.0.2c allows remote attackers to execute arbitrary code or cause a denial of service (buffer underflow and memory corruption) via an ANY field in crafted serialized data, aka the \"negative zero\" issue."
        }
      ],
      "uid_affected": [
        "201ac67dd9abe5826f687f02526d3ae616d28a8b4a1bca0c451be66b93b539ea_2034604"
      ],
      "hid_affected": [
        "/bin/WTP"
      ]
    },
    {
      "cpe_name": "OpenSSL 1.0.0 (CRITICAL)",
      "cve_count": 0,
      "base_score": 6,
      "exploitability_score": 6,
      "impact_score": 6,
      "all_cve_objects_bs": [
        {
          "cve_code": "CVE-2015-1791",
          "base_score": "6.8",
          "impact_score": "6.4",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "Race condition in the ssl3_get_new_session_ticket function in ssl/s3_clnt.c in OpenSSL before 0.9.8zg, 1.0.0 before 1.0.0s, 1.0.1 before 1.0.1n, and 1.0.2 before 1.0.2b, when used for a multi-threaded client, allows remote attackers to cause a denial of service (double free and application crash) or possibly have unspecified other impact by providing a NewSessionTicket during an attempt to reuse a ticket that had been obtained earlier."
        },
        {
          "cve_code": "CVE-2014-0195",
          "base_score": "6.8",
          "impact_score": "6.4",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "The dtls1_reassemble_fragment function in d1_both.c in OpenSSL before 0.9.8za, 1.0.0 before 1.0.0m, and 1.0.1 before 1.0.1h does not properly validate fragment lengths in DTLS ClientHello messages, which allows remote attackers to execute arbitrary code or cause a denial of service (buffer overflow and application crash) via a long non-initial fragment."
        },
        {
          "cve_code": "CVE-2015-0209",
          "base_score": "6.8",
          "impact_score": "6.4",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "Use-after-free vulnerability in the d2i_ECPrivateKey function in crypto/ec/ec_asn1.c in OpenSSL before 0.9.8zf, 1.0.0 before 1.0.0r, 1.0.1 before 1.0.1m, and 1.0.2 before 1.0.2a might allow remote attackers to cause a denial of service (memory corruption and application crash) or possibly have unspecified other impact via a malformed Elliptic Curve (EC) private-key file that is improperly handled during import."
        },
        {
          "cve_code": "CVE-2012-2333",
          "base_score": "6.8",
          "impact_score": "6.4",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "Integer underflow in OpenSSL before 0.9.8x, 1.0.0 before 1.0.0j, and 1.0.1 before 1.0.1c, when TLS 1.1, TLS 1.2, or DTLS is used with CBC encryption, allows remote attackers to cause a denial of service (buffer over-read) or possibly have unspecified other impact via a crafted TLS packet that is not properly handled during a certain explicit IV calculation."
        },
        {
          "cve_code": "CVE-2014-3509",
          "base_score": "6.8",
          "impact_score": "6.4",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "Race condition in the ssl_parse_serverhello_tlsext function in t1_lib.c in OpenSSL 1.0.0 before 1.0.0n and 1.0.1 before 1.0.1i, when multithreading and session resumption are used, allows remote SSL servers to cause a denial of service (memory overwrite and client application crash) or possibly have unspecified other impact by sending Elliptic Curve (EC) Supported Point Formats Extension data."
        },
        {
          "cve_code": "CVE-2010-1633",
          "base_score": "6.4",
          "impact_score": "4.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "RSA verification recovery in the EVP_PKEY_verify_recover function in OpenSSL 1.x before 1.0.0a, as used by pkeyutl and possibly other applications, returns uninitialized memory upon failure, which might allow context-dependent attackers to bypass intended key requirements or obtain sensitive information via unspecified vectors.  NOTE: some of these details are obtained from third party information."
        }
      ],
      "all_cve_objects_es": [],
      "all_cve_objects_is": [
        {
          "cve_code": "CVE-2015-1791",
          "base_score": "6.8",
          "impact_score": "6.4",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "Race condition in the ssl3_get_new_session_ticket function in ssl/s3_clnt.c in OpenSSL before 0.9.8zg, 1.0.0 before 1.0.0s, 1.0.1 before 1.0.1n, and 1.0.2 before 1.0.2b, when used for a multi-threaded client, allows remote attackers to cause a denial of service (double free and application crash) or possibly have unspecified other impact by providing a NewSessionTicket during an attempt to reuse a ticket that had been obtained earlier."
        },
        {
          "cve_code": "CVE-2007-5536",
          "base_score": "4.9",
          "impact_score": "6.9",
          "exploitability_score": "3.9",
          "version": "4.0",
          "description": "Unspecified vulnerability in OpenSSL before A.00.09.07l on HP-UX B.11.11, B.11.23, and B.11.31 allows local users to cause a denial of service via unspecified vectors."
        },
        {
          "cve_code": "CVE-2014-0195",
          "base_score": "6.8",
          "impact_score": "6.4",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "The dtls1_reassemble_fragment function in d1_both.c in OpenSSL before 0.9.8za, 1.0.0 before 1.0.0m, and 1.0.1 before 1.0.1h does not properly validate fragment lengths in DTLS ClientHello messages, which allows remote attackers to execute arbitrary code or cause a denial of service (buffer overflow and application crash) via a long non-initial fragment."
        },
        {
          "cve_code": "CVE-2015-0209",
          "base_score": "6.8",
          "impact_score": "6.4",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "Use-after-free vulnerability in the d2i_ECPrivateKey function in crypto/ec/ec_asn1.c in OpenSSL before 0.9.8zf, 1.0.0 before 1.0.0r, 1.0.1 before 1.0.1m, and 1.0.2 before 1.0.2a might allow remote attackers to cause a denial of service (memory corruption and application crash) or possibly have unspecified other impact via a malformed Elliptic Curve (EC) private-key file that is improperly handled during import."
        },
        {
          "cve_code": "CVE-2014-8176",
          "base_score": "7.5",
          "impact_score": "6.4",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "The dtls1_clear_queues function in ssl/d1_lib.c in OpenSSL before 0.9.8za, 1.0.0 before 1.0.0m, and 1.0.1 before 1.0.1h frees data structures without considering that application data can arrive between a ChangeCipherSpec message and a Finished message, which allows remote DTLS peers to cause a denial of service (memory corruption and application crash) or possibly have unspecified other impact via unexpected application data."
        },
        {
          "cve_code": "CVE-2012-2333",
          "base_score": "6.8",
          "impact_score": "6.4",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "Integer underflow in OpenSSL before 0.9.8x, 1.0.0 before 1.0.0j, and 1.0.1 before 1.0.1c, when TLS 1.1, TLS 1.2, or DTLS is used with CBC encryption, allows remote attackers to cause a denial of service (buffer over-read) or possibly have unspecified other impact via a crafted TLS packet that is not properly handled during a certain explicit IV calculation."
        },
        {
          "cve_code": "CVE-2012-2110",
          "base_score": "7.5",
          "impact_score": "6.4",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "The asn1_d2i_read_bio function in crypto/asn1/a_d2i_fp.c in OpenSSL before 0.9.8v, 1.0.0 before 1.0.0i, and 1.0.1 before 1.0.1a does not properly interpret integer data, which allows remote attackers to conduct buffer overflow attacks, and cause a denial of service (memory corruption) or possibly have unspecified other impact, via crafted DER data, as demonstrated by an X.509 certificate or an RSA public key."
        },
        {
          "cve_code": "CVE-2015-0292",
          "base_score": "7.5",
          "impact_score": "6.4",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "Integer underflow in the EVP_DecodeUpdate function in crypto/evp/encode.c in the base64-decoding implementation in OpenSSL before 0.9.8za, 1.0.0 before 1.0.0m, and 1.0.1 before 1.0.1h allows remote attackers to cause a denial of service (memory corruption) or possibly have unspecified other impact via crafted base64 data that triggers a buffer overflow."
        },
        {
          "cve_code": "CVE-2014-3567",
          "base_score": "7.1",
          "impact_score": "6.9",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "Memory leak in the tls_decrypt_ticket function in t1_lib.c in OpenSSL before 0.9.8zc, 1.0.0 before 1.0.0o, and 1.0.1 before 1.0.1j allows remote attackers to cause a denial of service (memory consumption) via a crafted session ticket that triggers an integrity-check failure."
        },
        {
          "cve_code": "CVE-2014-3509",
          "base_score": "6.8",
          "impact_score": "6.4",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "Race condition in the ssl_parse_serverhello_tlsext function in t1_lib.c in OpenSSL 1.0.0 before 1.0.0n and 1.0.1 before 1.0.1i, when multithreading and session resumption are used, allows remote SSL servers to cause a denial of service (memory overwrite and client application crash) or possibly have unspecified other impact by sending Elliptic Curve (EC) Supported Point Formats Extension data."
        },
        {
          "cve_code": "CVE-2010-4252",
          "base_score": "7.5",
          "impact_score": "6.4",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "OpenSSL before 1.0.0c, when J-PAKE is enabled, does not properly validate the public parameters in the J-PAKE protocol, which allows remote attackers to bypass the need for knowledge of the shared secret, and successfully authenticate, by sending crafted values in each round of the protocol."
        },
        {
          "cve_code": "CVE-2010-0742",
          "base_score": "7.5",
          "impact_score": "6.4",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "The Cryptographic Message Syntax (CMS) implementation in crypto/cms/cms_asn1.c in OpenSSL before 0.9.8o and 1.x before 1.0.0a does not properly handle structures that contain OriginatorInfo, which allows context-dependent attackers to modify invalid memory locations or conduct double-free attacks, and possibly execute arbitrary code, via unspecified vectors."
        },
        {
          "cve_code": "CVE-2014-3512",
          "base_score": "7.5",
          "impact_score": "6.4",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "Multiple buffer overflows in crypto/srp/srp_lib.c in the SRP implementation in OpenSSL 1.0.1 before 1.0.1i allow remote attackers to cause a denial of service (application crash) or possibly have unspecified other impact via an invalid SRP (1) g, (2) A, or (3) B parameter."
        }
      ],
      "uid_affected": [
        "201ac67dd9abe5826f687f02526d3ae616d28a8b4a1bca0c451be66b93b539ea_2034604"
      ],
      "hid_affected": [
        "/bin/WTP"
      ]
    },
    {
      "cpe_name": "OpenSSL 1.0.0 (CRITICAL)",
      "cve_count": 0,
      "base_score": 7,
      "exploitability_score": 7,
      "impact_score": 7,
      "all_cve_objects_bs": [
        {
          "cve_code": "CVE-2015-1789",
          "base_score": "7.5",
          "impact_score": "3.6",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "The X509_cmp_time function in crypto/x509/x509_vfy.c in OpenSSL before 0.9.8zg, 1.0.0 before 1.0.0s, 1.0.1 before 1.0.1n, and 1.0.2 before 1.0.2b allows remote attackers to cause a denial of service (out-of-bounds read and application crash) via a crafted length field in ASN1_TIME data, as demonstrated by an attack against a server that supports client authentication with a custom verification callback."
        },
        {
          "cve_code": "CVE-2014-0224",
          "base_score": "7.4",
          "impact_score": "5.2",
          "exploitability_score": "2.2",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "HIGH",
          "version": "4.0",
          "description": "OpenSSL before 0.9.8za, 1.0.0 before 1.0.0m, and 1.0.1 before 1.0.1h does not properly restrict processing of ChangeCipherSpec messages, which allows man-in-the-middle attackers to trigger use of a zero-length master key in certain OpenSSL-to-OpenSSL communications, and consequently hijack sessions or obtain sensitive information, via a crafted TLS handshake, aka the \"CCS Injection\" vulnerability."
        },
        {
          "cve_code": "CVE-2010-3864",
          "base_score": "7.6",
          "impact_score": "10",
          "exploitability_score": "4.9",
          "version": "4.0",
          "description": "Multiple race conditions in ssl/t1_lib.c in OpenSSL 0.9.8f through 0.9.8o, 1.0.0, and 1.0.0a, when multi-threading and internal caching are enabled on a TLS server, might allow remote attackers to execute arbitrary code via client data that triggers a heap-based buffer overflow, related to (1) the TLS server name extension and (2) elliptic curve cryptography."
        },
        {
          "cve_code": "CVE-2016-2109",
          "base_score": "7.5",
          "impact_score": "3.6",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "The asn1_d2i_read_bio function in crypto/asn1/a_d2i_fp.c in the ASN.1 BIO implementation in OpenSSL before 1.0.1t and 1.0.2 before 1.0.2h allows remote attackers to cause a denial of service (memory consumption) via a short invalid encoding."
        },
        {
          "cve_code": "CVE-2016-2106",
          "base_score": "7.5",
          "impact_score": "3.6",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "Integer overflow in the EVP_EncryptUpdate function in crypto/evp/evp_enc.c in OpenSSL before 1.0.1t and 1.0.2 before 1.0.2h allows remote attackers to cause a denial of service (heap memory corruption) via a large amount of data."
        },
        {
          "cve_code": "CVE-2014-8176",
          "base_score": "7.5",
          "impact_score": "6.4",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "The dtls1_clear_queues function in ssl/d1_lib.c in OpenSSL before 0.9.8za, 1.0.0 before 1.0.0m, and 1.0.1 before 1.0.1h frees data structures without considering that application data can arrive between a ChangeCipherSpec message and a Finished message, which allows remote DTLS peers to cause a denial of service (memory corruption and application crash) or possibly have unspecified other impact via unexpected application data."
        },
        {
          "cve_code": "CVE-2012-2110",
          "base_score": "7.5",
          "impact_score": "6.4",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "The asn1_d2i_read_bio function in crypto/asn1/a_d2i_fp.c in OpenSSL before 0.9.8v, 1.0.0 before 1.0.0i, and 1.0.1 before 1.0.1a does not properly interpret integer data, which allows remote attackers to conduct buffer overflow attacks, and cause a denial of service (memory corruption) or possibly have unspecified other impact, via crafted DER data, as demonstrated by an X.509 certificate or an RSA public key."
        },
        {
          "cve_code": "CVE-2015-0292",
          "base_score": "7.5",
          "impact_score": "6.4",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "Integer underflow in the EVP_DecodeUpdate function in crypto/evp/encode.c in the base64-decoding implementation in OpenSSL before 0.9.8za, 1.0.0 before 1.0.0m, and 1.0.1 before 1.0.1h allows remote attackers to cause a denial of service (memory corruption) or possibly have unspecified other impact via crafted base64 data that triggers a buffer overflow."
        },
        {
          "cve_code": "CVE-2014-3567",
          "base_score": "7.1",
          "impact_score": "6.9",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "Memory leak in the tls_decrypt_ticket function in t1_lib.c in OpenSSL before 0.9.8zc, 1.0.0 before 1.0.0o, and 1.0.1 before 1.0.1j allows remote attackers to cause a denial of service (memory consumption) via a crafted session ticket that triggers an integrity-check failure."
        },
        {
          "cve_code": "CVE-2010-4252",
          "base_score": "7.5",
          "impact_score": "6.4",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "OpenSSL before 1.0.0c, when J-PAKE is enabled, does not properly validate the public parameters in the J-PAKE protocol, which allows remote attackers to bypass the need for knowledge of the shared secret, and successfully authenticate, by sending crafted values in each round of the protocol."
        },
        {
          "cve_code": "CVE-2010-0742",
          "base_score": "7.5",
          "impact_score": "6.4",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "The Cryptographic Message Syntax (CMS) implementation in crypto/cms/cms_asn1.c in OpenSSL before 0.9.8o and 1.x before 1.0.0a does not properly handle structures that contain OriginatorInfo, which allows context-dependent attackers to modify invalid memory locations or conduct double-free attacks, and possibly execute arbitrary code, via unspecified vectors."
        },
        {
          "cve_code": "CVE-2014-3512",
          "base_score": "7.5",
          "impact_score": "6.4",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "Multiple buffer overflows in crypto/srp/srp_lib.c in the SRP implementation in OpenSSL 1.0.1 before 1.0.1i allow remote attackers to cause a denial of service (application crash) or possibly have unspecified other impact via an invalid SRP (1) g, (2) A, or (3) B parameter."
        }
      ],
      "all_cve_objects_es": [],
      "all_cve_objects_is": [],
      "uid_affected": [
        "201ac67dd9abe5826f687f02526d3ae616d28a8b4a1bca0c451be66b93b539ea_2034604"
      ],
      "hid_affected": [
        "/bin/WTP"
      ]
    },
    {
      "cpe_name": "OpenSSL 1.0.0 (CRITICAL)",
      "cve_count": 0,
      "base_score": 8,
      "exploitability_score": 8,
      "impact_score": 8,
      "all_cve_objects_bs": [
        {
          "cve_code": "CVE-2016-2176",
          "base_score": "8.2",
          "impact_score": "4.2",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "HIGH",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "The X509_NAME_oneline function in crypto/x509/x509_obj.c in OpenSSL before 1.0.1t and 1.0.2 before 1.0.2h allows remote attackers to obtain sensitive information from process stack memory or cause a denial of service (buffer over-read) via crafted EBCDIC ASN.1 data."
        }
      ],
      "all_cve_objects_es": [
        {
          "cve_code": "CVE-2015-1791",
          "base_score": "6.8",
          "impact_score": "6.4",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "Race condition in the ssl3_get_new_session_ticket function in ssl/s3_clnt.c in OpenSSL before 0.9.8zg, 1.0.0 before 1.0.0s, 1.0.1 before 1.0.1n, and 1.0.2 before 1.0.2b, when used for a multi-threaded client, allows remote attackers to cause a denial of service (double free and application crash) or possibly have unspecified other impact by providing a NewSessionTicket during an attempt to reuse a ticket that had been obtained earlier."
        },
        {
          "cve_code": "CVE-2015-3196",
          "base_score": "4.3",
          "impact_score": "2.9",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "ssl/s3_clnt.c in OpenSSL 1.0.0 before 1.0.0t, 1.0.1 before 1.0.1p, and 1.0.2 before 1.0.2d, when used for a multi-threaded client, writes the PSK identity hint to an incorrect data structure, which allows remote servers to cause a denial of service (race condition and double free) via a crafted ServerKeyExchange message."
        },
        {
          "cve_code": "CVE-2014-0195",
          "base_score": "6.8",
          "impact_score": "6.4",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "The dtls1_reassemble_fragment function in d1_both.c in OpenSSL before 0.9.8za, 1.0.0 before 1.0.0m, and 1.0.1 before 1.0.1h does not properly validate fragment lengths in DTLS ClientHello messages, which allows remote attackers to execute arbitrary code or cause a denial of service (buffer overflow and application crash) via a long non-initial fragment."
        },
        {
          "cve_code": "CVE-2014-0221",
          "base_score": "4.3",
          "impact_score": "2.9",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "The dtls1_get_message_fragment function in d1_both.c in OpenSSL before 0.9.8za, 1.0.0 before 1.0.0m, and 1.0.1 before 1.0.1h allows remote attackers to cause a denial of service (recursion and client crash) via a DTLS hello message in an invalid DTLS handshake."
        },
        {
          "cve_code": "CVE-2014-3470",
          "base_score": "4.3",
          "impact_score": "2.9",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "The ssl3_send_client_key_exchange function in s3_clnt.c in OpenSSL before 0.9.8za, 1.0.0 before 1.0.0m, and 1.0.1 before 1.0.1h, when an anonymous ECDH cipher suite is used, allows remote attackers to cause a denial of service (NULL pointer dereference and client crash) by triggering a NULL certificate value."
        },
        {
          "cve_code": "CVE-2014-0198",
          "base_score": "4.3",
          "impact_score": "2.9",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "The do_ssl3_write function in s3_pkt.c in OpenSSL 1.x through 1.0.1g, when SSL_MODE_RELEASE_BUFFERS is enabled, does not properly manage a buffer pointer during certain recursive calls, which allows remote attackers to cause a denial of service (NULL pointer dereference and application crash) via vectors that trigger an alert condition."
        },
        {
          "cve_code": "CVE-2013-6450",
          "base_score": "5.8",
          "impact_score": "4.9",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "The DTLS retransmission implementation in OpenSSL 1.0.0 before 1.0.0l and 1.0.1 before 1.0.1f does not properly maintain data structures for digest and encryption contexts, which might allow man-in-the-middle attackers to trigger the use of a different context and cause a denial of service (application crash) by interfering with packet delivery, related to ssl/d1_both.c and ssl/t1_enc.c."
        },
        {
          "cve_code": "CVE-2013-6449",
          "base_score": "4.3",
          "impact_score": "2.9",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "The ssl_get_algorithm2 function in ssl/s3_lib.c in OpenSSL before 1.0.2 obtains a certain version number from an incorrect data structure, which allows remote attackers to cause a denial of service (daemon crash) via crafted traffic from a TLS 1.2 client."
        },
        {
          "cve_code": "CVE-2015-0209",
          "base_score": "6.8",
          "impact_score": "6.4",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "Use-after-free vulnerability in the d2i_ECPrivateKey function in crypto/ec/ec_asn1.c in OpenSSL before 0.9.8zf, 1.0.0 before 1.0.0r, 1.0.1 before 1.0.1m, and 1.0.2 before 1.0.2a might allow remote attackers to cause a denial of service (memory corruption and application crash) or possibly have unspecified other impact via a malformed Elliptic Curve (EC) private-key file that is improperly handled during import."
        },
        {
          "cve_code": "CVE-2012-2333",
          "base_score": "6.8",
          "impact_score": "6.4",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "Integer underflow in OpenSSL before 0.9.8x, 1.0.0 before 1.0.0j, and 1.0.1 before 1.0.1c, when TLS 1.1, TLS 1.2, or DTLS is used with CBC encryption, allows remote attackers to cause a denial of service (buffer over-read) or possibly have unspecified other impact via a crafted TLS packet that is not properly handled during a certain explicit IV calculation."
        },
        {
          "cve_code": "CVE-2015-1788",
          "base_score": "4.3",
          "impact_score": "2.9",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "The BN_GF2m_mod_inv function in crypto/bn/bn_gf2m.c in OpenSSL before 0.9.8s, 1.0.0 before 1.0.0e, 1.0.1 before 1.0.1n, and 1.0.2 before 1.0.2b does not properly handle ECParameters structures in which the curve is over a malformed binary polynomial field, which allows remote attackers to cause a denial of service (infinite loop) via a session that uses an Elliptic Curve algorithm, as demonstrated by an attack against a server that supports client authentication."
        },
        {
          "cve_code": "CVE-2014-3568",
          "base_score": "4.3",
          "impact_score": "2.9",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "OpenSSL before 0.9.8zc, 1.0.0 before 1.0.0o, and 1.0.1 before 1.0.1j does not properly enforce the no-ssl3 build option, which allows remote attackers to bypass intended access restrictions via an SSL 3.0 handshake, related to s23_clnt.c and s23_srvr.c."
        },
        {
          "cve_code": "CVE-2014-3567",
          "base_score": "7.1",
          "impact_score": "6.9",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "Memory leak in the tls_decrypt_ticket function in t1_lib.c in OpenSSL before 0.9.8zc, 1.0.0 before 1.0.0o, and 1.0.1 before 1.0.1j allows remote attackers to cause a denial of service (memory consumption) via a crafted session ticket that triggers an integrity-check failure."
        },
        {
          "cve_code": "CVE-2014-3511",
          "base_score": "4.3",
          "impact_score": "2.9",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "The ssl23_get_client_hello function in s23_srvr.c in OpenSSL 1.0.1 before 1.0.1i allows man-in-the-middle attackers to force the use of TLS 1.0 by triggering ClientHello message fragmentation in communication between a client and server that both support later TLS versions, related to a \"protocol downgrade\" issue."
        },
        {
          "cve_code": "CVE-2014-3509",
          "base_score": "6.8",
          "impact_score": "6.4",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "Race condition in the ssl_parse_serverhello_tlsext function in t1_lib.c in OpenSSL 1.0.0 before 1.0.0n and 1.0.1 before 1.0.1i, when multithreading and session resumption are used, allows remote SSL servers to cause a denial of service (memory overwrite and client application crash) or possibly have unspecified other impact by sending Elliptic Curve (EC) Supported Point Formats Extension data."
        },
        {
          "cve_code": "CVE-2014-3508",
          "base_score": "4.3",
          "impact_score": "2.9",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "The OBJ_obj2txt function in crypto/objects/obj_dat.c in OpenSSL 0.9.8 before 0.9.8zb, 1.0.0 before 1.0.0n, and 1.0.1 before 1.0.1i, when pretty printing is used, does not ensure the presence of '\\0' characters, which allows context-dependent attackers to obtain sensitive information from process stack memory by reading output from X509_name_oneline, X509_name_print_ex, and unspecified other functions."
        },
        {
          "cve_code": "CVE-2010-4180",
          "base_score": "4.3",
          "impact_score": "2.9",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "OpenSSL before 0.9.8q, and 1.0.x before 1.0.0c, when SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG is enabled, does not properly prevent modification of the ciphersuite in the session cache, which allows remote attackers to force the downgrade to an unintended cipher via vectors involving sniffing network traffic to discover a session identifier."
        },
        {
          "cve_code": "CVE-2014-3510",
          "base_score": "4.3",
          "impact_score": "2.9",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "The ssl3_send_client_key_exchange function in s3_clnt.c in OpenSSL 0.9.8 before 0.9.8zb, 1.0.0 before 1.0.0n, and 1.0.1 before 1.0.1i allows remote DTLS servers to cause a denial of service (NULL pointer dereference and client application crash) via a crafted handshake message in conjunction with a (1) anonymous DH or (2) anonymous ECDH ciphersuite."
        },
        {
          "cve_code": "CVE-2011-4108",
          "base_score": "4.3",
          "impact_score": "2.9",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "The DTLS implementation in OpenSSL before 0.9.8s and 1.x before 1.0.0f performs a MAC check only if certain padding is valid, which makes it easier for remote attackers to recover plaintext via a padding oracle attack."
        },
        {
          "cve_code": "CVE-2011-4577",
          "base_score": "4.3",
          "impact_score": "2.9",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "OpenSSL before 0.9.8s and 1.x before 1.0.0f, when RFC 3779 support is enabled, allows remote attackers to cause a denial of service (assertion failure) via an X.509 certificate containing certificate-extension data associated with (1) IP address blocks or (2) Autonomous System (AS) identifiers."
        }
      ],
      "all_cve_objects_is": [],
      "uid_affected": [
        "201ac67dd9abe5826f687f02526d3ae616d28a8b4a1bca0c451be66b93b539ea_2034604"
      ],
      "hid_affected": [
        "/bin/WTP"
      ]
    },
    {
      "cpe_name": "OpenSSL 1.0.0 (CRITICAL)",
      "cve_count": 0,
      "base_score": 9,
      "exploitability_score": 9,
      "impact_score": 9,
      "all_cve_objects_bs": [
        {
          "cve_code": "CVE-2020-7043",
          "base_score": "9.1",
          "impact_score": "5.2",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "CRITICAL",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "An issue was discovered in openfortivpn 1.11.0 when used with OpenSSL before 1.0.2. tunnel.c mishandles certificate validation because hostname comparisons do not consider '\\0' characters, as demonstrated by a good.example.com\\x00evil.example.com attack."
        },
        {
          "cve_code": "CVE-2016-2108",
          "base_score": "9.8",
          "impact_score": "5.9",
          "exploitability_score": "3.9",
          "attackVector": "NETWORK",
          "baseSeverity": "CRITICAL",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "The ASN.1 implementation in OpenSSL before 1.0.1o and 1.0.2 before 1.0.2c allows remote attackers to execute arbitrary code or cause a denial of service (buffer underflow and memory corruption) via an ANY field in crafted serialized data, aka the \"negative zero\" issue."
        }
      ],
      "all_cve_objects_es": [],
      "all_cve_objects_is": [],
      "uid_affected": [
        "201ac67dd9abe5826f687f02526d3ae616d28a8b4a1bca0c451be66b93b539ea_2034604"
      ],
      "hid_affected": [
        "/bin/WTP"
      ]
    },
    {
      "cpe_name": "OpenSSL 1.0.0 (CRITICAL)",
      "cve_count": 0,
      "base_score": 10,
      "exploitability_score": 10,
      "impact_score": 10,
      "all_cve_objects_bs": [],
      "all_cve_objects_es": [
        {
          "cve_code": "CVE-2015-1790",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "The PKCS7_dataDecodefunction in crypto/pkcs7/pk7_doit.c in OpenSSL before 0.9.8zg, 1.0.0 before 1.0.0s, 1.0.1 before 1.0.1n, and 1.0.2 before 1.0.2b allows remote attackers to cause a denial of service (NULL pointer dereference and application crash) via a PKCS#7 blob that uses ASN.1 encoding and lacks inner EncryptedContent data."
        },
        {
          "cve_code": "CVE-2013-0166",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "OpenSSL before 0.9.8y, 1.0.0 before 1.0.0k, and 1.0.1 before 1.0.1d does not properly perform signature verification for OCSP responses, which allows remote OCSP servers to cause a denial of service (NULL pointer dereference and application crash) via an invalid key."
        },
        {
          "cve_code": "CVE-2015-0293",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "The SSLv2 implementation in OpenSSL before 0.9.8zf, 1.0.0 before 1.0.0r, 1.0.1 before 1.0.1m, and 1.0.2 before 1.0.2a allows remote attackers to cause a denial of service (s2_lib.c assertion failure and daemon exit) via a crafted CLIENT-MASTER-KEY message."
        },
        {
          "cve_code": "CVE-2012-1165",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "The mime_param_cmp function in crypto/asn1/asn_mime.c in OpenSSL before 0.9.8u and 1.x before 1.0.0h allows remote attackers to cause a denial of service (NULL pointer dereference and application crash) via a crafted S/MIME message, a different vulnerability than CVE-2006-7250."
        },
        {
          "cve_code": "CVE-2012-0884",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "The implementation of Cryptographic Message Syntax (CMS) and PKCS #7 in OpenSSL before 0.9.8u and 1.x before 1.0.0h does not properly restrict certain oracle behavior, which makes it easier for context-dependent attackers to decrypt data via a Million Message Attack (MMA) adaptive chosen ciphertext attack."
        },
        {
          "cve_code": "CVE-2015-0286",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "The ASN1_TYPE_cmp function in crypto/asn1/a_type.c in OpenSSL before 0.9.8zf, 1.0.0 before 1.0.0r, 1.0.1 before 1.0.1m, and 1.0.2 before 1.0.2a does not properly perform boolean-type comparisons, which allows remote attackers to cause a denial of service (invalid read operation and application crash) via a crafted X.509 certificate to an endpoint that uses the certificate-verification feature."
        },
        {
          "cve_code": "CVE-2014-8176",
          "base_score": "7.5",
          "impact_score": "6.4",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "The dtls1_clear_queues function in ssl/d1_lib.c in OpenSSL before 0.9.8za, 1.0.0 before 1.0.0m, and 1.0.1 before 1.0.1h frees data structures without considering that application data can arrive between a ChangeCipherSpec message and a Finished message, which allows remote DTLS peers to cause a denial of service (memory corruption and application crash) or possibly have unspecified other impact via unexpected application data."
        },
        {
          "cve_code": "CVE-2012-2110",
          "base_score": "7.5",
          "impact_score": "6.4",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "The asn1_d2i_read_bio function in crypto/asn1/a_d2i_fp.c in OpenSSL before 0.9.8v, 1.0.0 before 1.0.0i, and 1.0.1 before 1.0.1a does not properly interpret integer data, which allows remote attackers to conduct buffer overflow attacks, and cause a denial of service (memory corruption) or possibly have unspecified other impact, via crafted DER data, as demonstrated by an X.509 certificate or an RSA public key."
        },
        {
          "cve_code": "CVE-2015-1792",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "The do_free_upto function in crypto/cms/cms_smime.c in OpenSSL before 0.9.8zg, 1.0.0 before 1.0.0s, 1.0.1 before 1.0.1n, and 1.0.2 before 1.0.2b allows remote attackers to cause a denial of service (infinite loop) via vectors that trigger a NULL value of a BIO data structure, as demonstrated by an unrecognized X.660 OID for a hash function."
        },
        {
          "cve_code": "CVE-2015-0292",
          "base_score": "7.5",
          "impact_score": "6.4",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "Integer underflow in the EVP_DecodeUpdate function in crypto/evp/encode.c in the base64-decoding implementation in OpenSSL before 0.9.8za, 1.0.0 before 1.0.0m, and 1.0.1 before 1.0.1h allows remote attackers to cause a denial of service (memory corruption) or possibly have unspecified other impact via crafted base64 data that triggers a buffer overflow."
        },
        {
          "cve_code": "CVE-2015-0288",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "The X509_to_X509_REQ function in crypto/x509/x509_req.c in OpenSSL before 0.9.8zf, 1.0.0 before 1.0.0r, 1.0.1 before 1.0.1m, and 1.0.2 before 1.0.2a might allow attackers to cause a denial of service (NULL pointer dereference and application crash) via an invalid certificate key."
        },
        {
          "cve_code": "CVE-2015-0287",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "The ASN1_item_ex_d2i function in crypto/asn1/tasn_dec.c in OpenSSL before 0.9.8zf, 1.0.0 before 1.0.0r, 1.0.1 before 1.0.1m, and 1.0.2 before 1.0.2a does not reinitialize CHOICE and ADB data structures, which might allow attackers to cause a denial of service (invalid write operation and memory corruption) by leveraging an application that relies on ASN.1 structure reuse."
        },
        {
          "cve_code": "CVE-2015-0289",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "The PKCS#7 implementation in OpenSSL before 0.9.8zf, 1.0.0 before 1.0.0r, 1.0.1 before 1.0.1m, and 1.0.2 before 1.0.2a does not properly handle a lack of outer ContentInfo, which allows attackers to cause a denial of service (NULL pointer dereference and application crash) by leveraging an application that processes arbitrary PKCS#7 data and providing malformed data with ASN.1 encoding, related to crypto/pkcs7/pk7_doit.c and crypto/pkcs7/pk7_lib.c."
        },
        {
          "cve_code": "CVE-2009-1379",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "Use-after-free vulnerability in the dtls1_retrieve_buffered_fragment function in ssl/d1_both.c in OpenSSL 1.0.0 Beta 2 allows remote attackers to cause a denial of service (openssl s_client crash) and possibly have unspecified other impact via a DTLS packet, as demonstrated by a packet from a server that uses a crafted server certificate."
        },
        {
          "cve_code": "CVE-2011-0014",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "ssl/t1_lib.c in OpenSSL 0.9.8h through 0.9.8q and 1.0.0 through 1.0.0c allows remote attackers to cause a denial of service (crash), and possibly obtain sensitive information in applications that use OpenSSL, via a malformed ClientHello handshake message that triggers an out-of-bounds memory access, aka \"OCSP stapling vulnerability.\""
        },
        {
          "cve_code": "CVE-2010-4252",
          "base_score": "7.5",
          "impact_score": "6.4",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "OpenSSL before 1.0.0c, when J-PAKE is enabled, does not properly validate the public parameters in the J-PAKE protocol, which allows remote attackers to bypass the need for knowledge of the shared secret, and successfully authenticate, by sending crafted values in each round of the protocol."
        },
        {
          "cve_code": "CVE-2010-0742",
          "base_score": "7.5",
          "impact_score": "6.4",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "The Cryptographic Message Syntax (CMS) implementation in crypto/cms/cms_asn1.c in OpenSSL before 0.9.8o and 1.x before 1.0.0a does not properly handle structures that contain OriginatorInfo, which allows context-dependent attackers to modify invalid memory locations or conduct double-free attacks, and possibly execute arbitrary code, via unspecified vectors."
        },
        {
          "cve_code": "CVE-2009-4355",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "Memory leak in the zlib_stateful_finish function in crypto/comp/c_zlib.c in OpenSSL 0.9.8l and earlier and 1.0.0 Beta through Beta 4 allows remote attackers to cause a denial of service (memory consumption) via vectors that trigger incorrect calls to the CRYPTO_cleanup_all_ex_data function, as demonstrated by use of SSLv3 and PHP with the Apache HTTP Server, a related issue to CVE-2008-1678."
        },
        {
          "cve_code": "CVE-2014-3512",
          "base_score": "7.5",
          "impact_score": "6.4",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "Multiple buffer overflows in crypto/srp/srp_lib.c in the SRP implementation in OpenSSL 1.0.1 before 1.0.1i allow remote attackers to cause a denial of service (application crash) or possibly have unspecified other impact via an invalid SRP (1) g, (2) A, or (3) B parameter."
        },
        {
          "cve_code": "CVE-2014-3507",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "Memory leak in d1_both.c in the DTLS implementation in OpenSSL 0.9.8 before 0.9.8zb, 1.0.0 before 1.0.0n, and 1.0.1 before 1.0.1i allows remote attackers to cause a denial of service (memory consumption) via zero-length DTLS fragments that trigger improper handling of the return value of a certain insert function."
        },
        {
          "cve_code": "CVE-2014-3506",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "d1_both.c in the DTLS implementation in OpenSSL 0.9.8 before 0.9.8zb, 1.0.0 before 1.0.0n, and 1.0.1 before 1.0.1i allows remote attackers to cause a denial of service (memory consumption) via crafted DTLS handshake messages that trigger memory allocations corresponding to large length values."
        },
        {
          "cve_code": "CVE-2014-3505",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "Double free vulnerability in d1_both.c in the DTLS implementation in OpenSSL 0.9.8 before 0.9.8zb, 1.0.0 before 1.0.0n, and 1.0.1 before 1.0.1i allows remote attackers to cause a denial of service (application crash) via crafted DTLS packets that trigger an error condition."
        },
        {
          "cve_code": "CVE-2011-4619",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "The Server Gated Cryptography (SGC) implementation in OpenSSL before 0.9.8s and 1.x before 1.0.0f does not properly handle handshake restarts, which allows remote attackers to cause a denial of service (CPU consumption) via unspecified vectors."
        },
        {
          "cve_code": "CVE-2011-4576",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "The SSL 3.0 implementation in OpenSSL before 0.9.8s and 1.x before 1.0.0f does not properly initialize data structures for block cipher padding, which might allow remote attackers to obtain sensitive information by decrypting the padding data sent by an SSL peer."
        },
        {
          "cve_code": "CVE-2012-0027",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "The GOST ENGINE in OpenSSL before 1.0.0f does not properly handle invalid parameters for the GOST block cipher, which allows remote attackers to cause a denial of service (daemon crash) via crafted data from a TLS client."
        },
        {
          "cve_code": "CVE-2011-3210",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "The ephemeral ECDH ciphersuite functionality in OpenSSL 0.9.8 through 0.9.8r and 1.0.x before 1.0.0e does not ensure thread safety during processing of handshake messages from clients, which allows remote attackers to cause a denial of service (daemon crash) via out-of-order messages that violate the TLS protocol."
        },
        {
          "cve_code": "CVE-2011-3207",
          "base_score": "5",
          "impact_score": "2.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "crypto/x509/x509_vfy.c in OpenSSL 1.0.x before 1.0.0e does not initialize certain structure members, which makes it easier for remote attackers to bypass CRL validation by using a nextUpdate value corresponding to a time in the past."
        },
        {
          "cve_code": "CVE-2010-1633",
          "base_score": "6.4",
          "impact_score": "4.9",
          "exploitability_score": "10",
          "version": "4.0",
          "description": "RSA verification recovery in the EVP_PKEY_verify_recover function in OpenSSL 1.x before 1.0.0a, as used by pkeyutl and possibly other applications, returns uninitialized memory upon failure, which might allow context-dependent attackers to bypass intended key requirements or obtain sensitive information via unspecified vectors.  NOTE: some of these details are obtained from third party information."
        }
      ],
      "all_cve_objects_is": [
        {
          "cve_code": "CVE-2010-3864",
          "base_score": "7.6",
          "impact_score": "10",
          "exploitability_score": "4.9",
          "version": "4.0",
          "description": "Multiple race conditions in ssl/t1_lib.c in OpenSSL 0.9.8f through 0.9.8o, 1.0.0, and 1.0.0a, when multi-threading and internal caching are enabled on a TLS server, might allow remote attackers to execute arbitrary code via client data that triggers a heap-based buffer overflow, related to (1) the TLS server name extension and (2) elliptic curve cryptography."
        }
      ],
      "uid_affected": [
        "201ac67dd9abe5826f687f02526d3ae616d28a8b4a1bca0c451be66b93b539ea_2034604"
      ],
      "hid_affected": [
        "/bin/WTP"
      ]
    },
    {
      "cpe_name": "jQuery 1.7",
      "cve_count": 0,
      "base_score": 1,
      "exploitability_score": 1,
      "impact_score": 1,
      "all_cve_objects_bs": [],
      "all_cve_objects_es": [],
      "all_cve_objects_is": [],
      "uid_affected": [
        "737b5734974eea5b1ff490de2389aeeb0d11386276a956ffb9944ba5a480d276_93870"
      ],
      "hid_affected": [
        "/webroot/public/j.js"
      ]
    },
    {
      "cpe_name": "jQuery 1.7",
      "cve_count": 0,
      "base_score": 2,
      "exploitability_score": 2,
      "impact_score": 2,
      "all_cve_objects_bs": [],
      "all_cve_objects_es": [
        {
          "cve_code": "CVE-2021-41184",
          "base_score": "6.1",
          "impact_score": "2.7",
          "exploitability_score": "2.8",
          "attackVector": "NETWORK",
          "baseSeverity": "MEDIUM",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "jQuery-UI is the official jQuery user interface library. Prior to version 1.13.0, accepting the value of the `of` option of the `.position()` util from untrusted sources may execute untrusted code. The issue is fixed in jQuery UI 1.13.0. Any string value passed to the `of` option is now treated as a CSS selector. A workaround is to not accept the value of the `of` option from untrusted sources."
        },
        {
          "cve_code": "CVE-2021-41183",
          "base_score": "6.1",
          "impact_score": "2.7",
          "exploitability_score": "2.8",
          "attackVector": "NETWORK",
          "baseSeverity": "MEDIUM",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "jQuery-UI is the official jQuery user interface library. Prior to version 1.13.0, accepting the value of various `*Text` options of the Datepicker widget from untrusted sources may execute untrusted code. The issue is fixed in jQuery UI 1.13.0. The values passed to various `*Text` options are now always treated as pure text, not HTML. A workaround is to not accept the value of the `*Text` options from untrusted sources."
        },
        {
          "cve_code": "CVE-2021-41182",
          "base_score": "6.1",
          "impact_score": "2.7",
          "exploitability_score": "2.8",
          "attackVector": "NETWORK",
          "baseSeverity": "MEDIUM",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "jQuery-UI is the official jQuery user interface library. Prior to version 1.13.0, accepting the value of the `altField` option of the Datepicker widget from untrusted sources may execute untrusted code. The issue is fixed in jQuery UI 1.13.0. Any string value passed to the `altField` option is now treated as a CSS selector. A workaround is to not accept the value of the `altField` option from untrusted sources."
        }
      ],
      "all_cve_objects_is": [
        {
          "cve_code": "CVE-2021-41184",
          "base_score": "6.1",
          "impact_score": "2.7",
          "exploitability_score": "2.8",
          "attackVector": "NETWORK",
          "baseSeverity": "MEDIUM",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "jQuery-UI is the official jQuery user interface library. Prior to version 1.13.0, accepting the value of the `of` option of the `.position()` util from untrusted sources may execute untrusted code. The issue is fixed in jQuery UI 1.13.0. Any string value passed to the `of` option is now treated as a CSS selector. A workaround is to not accept the value of the `of` option from untrusted sources."
        },
        {
          "cve_code": "CVE-2021-41183",
          "base_score": "6.1",
          "impact_score": "2.7",
          "exploitability_score": "2.8",
          "attackVector": "NETWORK",
          "baseSeverity": "MEDIUM",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "jQuery-UI is the official jQuery user interface library. Prior to version 1.13.0, accepting the value of various `*Text` options of the Datepicker widget from untrusted sources may execute untrusted code. The issue is fixed in jQuery UI 1.13.0. The values passed to various `*Text` options are now always treated as pure text, not HTML. A workaround is to not accept the value of the `*Text` options from untrusted sources."
        },
        {
          "cve_code": "CVE-2021-41182",
          "base_score": "6.1",
          "impact_score": "2.7",
          "exploitability_score": "2.8",
          "attackVector": "NETWORK",
          "baseSeverity": "MEDIUM",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "jQuery-UI is the official jQuery user interface library. Prior to version 1.13.0, accepting the value of the `altField` option of the Datepicker widget from untrusted sources may execute untrusted code. The issue is fixed in jQuery UI 1.13.0. Any string value passed to the `altField` option is now treated as a CSS selector. A workaround is to not accept the value of the `altField` option from untrusted sources."
        },
        {
          "cve_code": "CVE-2010-5312",
          "base_score": "4.3",
          "impact_score": "2.9",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "Cross-site scripting (XSS) vulnerability in jquery.ui.dialog.js in the Dialog widget in jQuery UI before 1.10.0 allows remote attackers to inject arbitrary web script or HTML via the title option."
        }
      ],
      "uid_affected": [
        "737b5734974eea5b1ff490de2389aeeb0d11386276a956ffb9944ba5a480d276_93870"
      ],
      "hid_affected": [
        "/webroot/public/j.js"
      ]
    },
    {
      "cpe_name": "jQuery 1.7",
      "cve_count": 0,
      "base_score": 3,
      "exploitability_score": 3,
      "impact_score": 3,
      "all_cve_objects_bs": [],
      "all_cve_objects_es": [],
      "all_cve_objects_is": [],
      "uid_affected": [
        "737b5734974eea5b1ff490de2389aeeb0d11386276a956ffb9944ba5a480d276_93870"
      ],
      "hid_affected": [
        "/webroot/public/j.js"
      ]
    },
    {
      "cpe_name": "jQuery 1.7",
      "cve_count": 0,
      "base_score": 4,
      "exploitability_score": 4,
      "impact_score": 4,
      "all_cve_objects_bs": [
        {
          "cve_code": "CVE-2010-5312",
          "base_score": "4.3",
          "impact_score": "2.9",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "Cross-site scripting (XSS) vulnerability in jquery.ui.dialog.js in the Dialog widget in jQuery UI before 1.10.0 allows remote attackers to inject arbitrary web script or HTML via the title option."
        }
      ],
      "all_cve_objects_es": [],
      "all_cve_objects_is": [],
      "uid_affected": [
        "737b5734974eea5b1ff490de2389aeeb0d11386276a956ffb9944ba5a480d276_93870"
      ],
      "hid_affected": [
        "/webroot/public/j.js"
      ]
    },
    {
      "cpe_name": "jQuery 1.7",
      "cve_count": 0,
      "base_score": 5,
      "exploitability_score": 5,
      "impact_score": 5,
      "all_cve_objects_bs": [],
      "all_cve_objects_es": [],
      "all_cve_objects_is": [],
      "uid_affected": [
        "737b5734974eea5b1ff490de2389aeeb0d11386276a956ffb9944ba5a480d276_93870"
      ],
      "hid_affected": [
        "/webroot/public/j.js"
      ]
    },
    {
      "cpe_name": "jQuery 1.7",
      "cve_count": 0,
      "base_score": 6,
      "exploitability_score": 6,
      "impact_score": 6,
      "all_cve_objects_bs": [
        {
          "cve_code": "CVE-2021-41184",
          "base_score": "6.1",
          "impact_score": "2.7",
          "exploitability_score": "2.8",
          "attackVector": "NETWORK",
          "baseSeverity": "MEDIUM",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "jQuery-UI is the official jQuery user interface library. Prior to version 1.13.0, accepting the value of the `of` option of the `.position()` util from untrusted sources may execute untrusted code. The issue is fixed in jQuery UI 1.13.0. Any string value passed to the `of` option is now treated as a CSS selector. A workaround is to not accept the value of the `of` option from untrusted sources."
        },
        {
          "cve_code": "CVE-2021-41183",
          "base_score": "6.1",
          "impact_score": "2.7",
          "exploitability_score": "2.8",
          "attackVector": "NETWORK",
          "baseSeverity": "MEDIUM",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "jQuery-UI is the official jQuery user interface library. Prior to version 1.13.0, accepting the value of various `*Text` options of the Datepicker widget from untrusted sources may execute untrusted code. The issue is fixed in jQuery UI 1.13.0. The values passed to various `*Text` options are now always treated as pure text, not HTML. A workaround is to not accept the value of the `*Text` options from untrusted sources."
        },
        {
          "cve_code": "CVE-2021-41182",
          "base_score": "6.1",
          "impact_score": "2.7",
          "exploitability_score": "2.8",
          "attackVector": "NETWORK",
          "baseSeverity": "MEDIUM",
          "attackComplexity": "LOW",
          "version": "4.0",
          "description": "jQuery-UI is the official jQuery user interface library. Prior to version 1.13.0, accepting the value of the `altField` option of the Datepicker widget from untrusted sources may execute untrusted code. The issue is fixed in jQuery UI 1.13.0. Any string value passed to the `altField` option is now treated as a CSS selector. A workaround is to not accept the value of the `altField` option from untrusted sources."
        }
      ],
      "all_cve_objects_es": [],
      "all_cve_objects_is": [],
      "uid_affected": [
        "737b5734974eea5b1ff490de2389aeeb0d11386276a956ffb9944ba5a480d276_93870"
      ],
      "hid_affected": [
        "/webroot/public/j.js"
      ]
    },
    {
      "cpe_name": "jQuery 1.7",
      "cve_count": 0,
      "base_score": 7,
      "exploitability_score": 7,
      "impact_score": 7,
      "all_cve_objects_bs": [],
      "all_cve_objects_es": [],
      "all_cve_objects_is": [],
      "uid_affected": [
        "737b5734974eea5b1ff490de2389aeeb0d11386276a956ffb9944ba5a480d276_93870"
      ],
      "hid_affected": [
        "/webroot/public/j.js"
      ]
    },
    {
      "cpe_name": "jQuery 1.7",
      "cve_count": 0,
      "base_score": 8,
      "exploitability_score": 8,
      "impact_score": 8,
      "all_cve_objects_bs": [],
      "all_cve_objects_es": [
        {
          "cve_code": "CVE-2010-5312",
          "base_score": "4.3",
          "impact_score": "2.9",
          "exploitability_score": "8.6",
          "version": "4.0",
          "description": "Cross-site scripting (XSS) vulnerability in jquery.ui.dialog.js in the Dialog widget in jQuery UI before 1.10.0 allows remote attackers to inject arbitrary web script or HTML via the title option."
        }
      ],
      "all_cve_objects_is": [],
      "uid_affected": [
        "737b5734974eea5b1ff490de2389aeeb0d11386276a956ffb9944ba5a480d276_93870"
      ],
      "hid_affected": [
        "/webroot/public/j.js"
      ]
    },
    {
      "cpe_name": "jQuery 1.7",
      "cve_count": 0,
      "base_score": 9,
      "exploitability_score": 9,
      "impact_score": 9,
      "all_cve_objects_bs": [],
      "all_cve_objects_es": [],
      "all_cve_objects_is": [],
      "uid_affected": [
        "737b5734974eea5b1ff490de2389aeeb0d11386276a956ffb9944ba5a480d276_93870"
      ],
      "hid_affected": [
        "/webroot/public/j.js"
      ]
    },
    {
      "cpe_name": "jQuery 1.7",
      "cve_count": 0,
      "base_score": 10,
      "exploitability_score": 10,
      "impact_score": 10,
      "all_cve_objects_bs": [],
      "all_cve_objects_es": [],
      "all_cve_objects_is": [],
      "uid_affected": [
        "737b5734974eea5b1ff490de2389aeeb0d11386276a956ffb9944ba5a480d276_93870"
      ],
      "hid_affected": [
        "/webroot/public/j.js"
      ]
    }
  ]