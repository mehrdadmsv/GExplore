var domain_array=new Array('AD', 'Apple', 'AT', 'C6', 'CA', 'CK', 'CL', 'COL', 'CT', 'CUB', 'CW', 'CY', 'DB', 'DC', 'DI', 'DSL', 'EB', 'EGF', 'F5_8C', 'FG', 'FN3', 'FolN', 'KZ', 'FZ', 'GL', 'Gran', 'HX', 'IG', 'KR', 'KU', 'LA', 'LamB', 'LE', 'LG', 'LN', 'LRR', 'LRRn', 'LRRc', 'LY', 'LZ', 'MD', 'PepM12', 'MP', 'PepM10', 'PepS1', 'PepM14', 'PepM13', 'PepS8', 'N1', 'Ptre', 'RcpL', 'SEA', 'ShK', 'SM', 'SR', 'Sushi', 'T1', 'TY', 'UL', 'VA', 'VC', 'VD', 'WA', 'WSN', 'TGFb', 'GPS', 'NC10', 'ColN', 'CBM', 'Gra6', 'TIL', 'DOMON', 'CX', 'DUF1096', 'CtX', 'Grd', 'FU', 'DUF1647', 'MAM', 'DUF19', 'Chit', 'DUF130', 'DUF148', 'SCPlike', 'Wilms', 'DUF236', 'DUF271', 'DUF595', 'VOMI', 'V5_TPX', 'Insulin', 'DUF316', 'DUF282', 'DUF_CC', 'DUF1261', 'DUF870', 'SapB', 'ET', 'DUF268', 'ANFR', 'CLC', 'Ion_tr', 'PlsC', 'LITAF', 'Pmp3', 'DnaJ', 'cNMP', 'CBS', 'NRF', 'ABC2_m', 'I29', 'RICIN', 'GlyTr2', 'PBPe', 'tSNARE', 'SynN', 'E1E2ATP', 'P_ATP_N', 'P_ATP_C', 'Hydrol', 'Rhomb', 'P_Propr', 'PepS9', 'PepC1', 'B4_1N', 'C2', 'CRIB', 'Death', 'KIN', 'MATH', 'PDZ', 'PH', 'PI3K', 'PTP', 'Ras_as', 'RGS', 'RhoGAP', 'RhoGEF', 'SH2', 'SH3', 'WD40', 'Arm', 'Spec', '14_3_3', 'RasGAP', 'ZU5', 'Gcyc', 'Phtase', 'GTPase', 'SAM', 'DUF227', 'DUF1679', 'C1', 'Kin_Ct', 'G_alpha', 'bHLH', 'BTB', 'Ets', 'HMG', 'HOM', 'POU', 'Znf', 'LIM', 'NhrLig', 'Bromo', 'bZIP', 'Chromo', 'T_Box', 'Fork_Hd', 'PAX', 'DUF38', 'MFS_1', 'Fba_2', 'EF_hand', 'RRM', 'MSP', 'DEAD_N', 'Helic_C', 'DUF13', 'Tro_My', 'Ubiq', 'Fbox', 'Ankyr', 'PAZ', 'TPR', 'SPK', 'WW', 'Piwi', 'SNF2_N', 'PAW', 'SP', 'TM', 'Pfam', 'SMART', 'Band_7', 'Kelch', 'Phox', 'Vincul', 'Fukutin', 'FHA', 'DUF272', 'DUF1248', 'DUF1605', 'DUF780', 'BRCT', 'SET', 'HEAT', 'KH', 'ABHyd', 'AbHyd3', 'ACBP', 'AcCoA_dh', 'Acy_dh_M', 'Acy_dh_N', 'Acy_dh2', 'ADH_N', 'ADH_N', 'Ah_perox', 'APH', 'Arre_C', 'Arre_N', 'AT_hook', 'BACK', 'BPI2', 'CH', 'CHK', 'Claudin3', 'CYCL', 'CysPc', 'Cyt-b5', 'DM', 'DSRM', 'DUF1265', 'DUF1280', 'DUF2650', 'DUF281', 'DUF3557', 'DUF976', 'EamA', 'ECH', 'EF-Tu', 'EF-Tu2', 'FARP', 'FeoB_N', 'FERM_C', 'Fringe', 'G_patch', 'GR', 'GST_N', 'H2A', 'H2B', 'H3', 'H4', 'HA2', 'HintC', 'HintN', 'HisPhos2', 'IBR', 'IFP', 'IQ', 'JmjC', 'Lactam_B', 'Lin-8', 'LisH', 'LTD', 'MFP2b', 'MMR', 'MreB', 'MSP4', 'MYND', 'Patatin', 'P-Diest', 'PepM13_N', 'PepM16', 'PepM16_C', 'PINT', 'PKD', 'PrmA', 'Protea', 'PUF', 'PyrR2', 'Redox', 'RHOD', 'RmSB', 'S1', 'SANT', 'SEC14', 'Skp1', 'Snf7', 'SPRY', 'Ster-S', 'TBC', 'TCP1', 'Ub_MT', 'UBA', 'UNC-93', 'LGC-GluB', 'GPCR_Rhodopsin', 'GPCR_secretin', '7TM_GPCR_Sre', '7TM_GPCR_Srg', '7TM_GPCR_Sra', '7TM_GPCR_Srb', '7TM_GPCR_Srr', '7TM_GPCR_Sru', 'Neuro_channel_lgbd', 'Neuro_channel_tm', 'Histone', 'UDP_gluc_trans', 'Cytochrome_P450', 'Glycoside_hydrolase', 'DUF23', 'Na_chan_AS', 'Ion_glu_rcpt', 'DH_SDR', 'ABC_transporter', 'ABC_transporter_TM', 'Myosin_head', 'Myosin_tail', 'Tubulin_GTPase', 'Tubulin_Cterm', 'Kinesin_motor', 'K_chan_2pore', 'K_chan_volt', 'Innexin', 'Globin', 'actin', 'DUF274', 'Na_diCO_symport', 'Transthyr_rel', 'Nuclease', 'Prefoldin', 'Bestrophin', 'HSP20', 'Tetraspanin', 'DUF229', 'Hsp70', 'DUF684', 'DUF621', 'DUF273', 'DUF644', 'DUF1258', 'DUF672', 'DUF1114', 'DUF288', 'Acyltransferase', 'Carbesterase_B', 'Mitoch_carrier', 'UBQ_conjugat_E2', 'Patched', 'AAA', 'AA_perm', 'Aa_trans', 'Cation_efflux', 'MBOAT', 'Na_H_ex', 'Na_Ca_ex', 'PepM1', 'PepS10', 'SNF', 'Sugar_tr', 'Tetraspanin', 'Zip', '3b-HSD', 'AcylT', 'AhpC', 'AKR', 'Aldedh', 'AMPB', 'Asp', 'AT_12', 'AT_5', 'Branch', 'C_AcyT', 'Ctr', 'DAO', 'DLH', 'Epi', 'EXOIII', 'FADB2', 'Gal_T', 'GlyT', 'GlyT28_C', 'Lip_2', 'Lip_3', 'Lip_G', 'MT_11', 'MT_12', 'MTS', 'NucST', 'NUDIX', 'PALP', 'PBPb', 'PepS28', 'PGAM', 'Polys2', 'PP2Cc', 'Pro_iso', 'Pyr_deC', 'SERPIN', 'Sm', '7TM_GPCR_Srab', '7TM_GPCR_Srbc', '7TM_GPCR_Srh', '7TM_GPCR_Srh', '7TM_GPCR_Sri', '7TM_GPCR_Srj', '7TM_GPCR_Srsx', '7TM_GPCR_Srt', '7TM_GPCR_Sru', '7TM_GPCR_Srv', '7TM_GPCR_Srw', '7TM_GPCR_Srx', '7TM_GPCR_Srxa', '7TM_GPCR_Srz', '7TM_GPCR_Str', 'TPT', 'UAA', 'UBCc', 'UCH');
function autocomplete(input, array) {
    let currentFocus;

    // When the user types in the input field
    input.addEventListener("input", function(e) {
        let a, b, i, val = this.value;

        // Extract the last segment of the input after the last comma
        let lastCommaIndex = val.lastIndexOf(",");
        let lastSegment = lastCommaIndex === -1 ? val.trim() : val.substring(lastCommaIndex + 1).trim();

        // Close any already open lists of autocompleted values
        closeAllLists();
        if (!lastSegment) return false;

        currentFocus = -1;

        // Create a DIV element that will contain the suggestions
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "-autocomplete-list");
        a.setAttribute("class", "autocomplete-items");

        // Set the dropdown to be positioned absolutely relative to the input
        a.style.position = "absolute";
        a.style.top = (input.offsetTop + input.offsetHeight) + "px";
        a.style.left = input.offsetLeft + "px";
        a.style.width = input.offsetWidth + "px";

        // Append the DIV element as a child of the autocomplete container
        this.parentNode.appendChild(a);

        // Loop through the array of suggestions
        for (i = 0; i < array.length; i++) {
            // Check if the item starts with the same letters as the last segment of the text field value
            if (array[i].substr(0, lastSegment.length).toUpperCase() === lastSegment.toUpperCase()) {
                // Create a DIV element for each matching element
                b = document.createElement("DIV");

                // Make the matching letters bold
                b.innerHTML = "<strong>" + array[i].substr(0, lastSegment.length) + "</strong>";
                b.innerHTML += array[i].substr(lastSegment.length);

                // Insert a hidden input field that will hold the current array item's value
                b.innerHTML += "<input type='hidden' value='" + array[i] + "'>";

                // When someone clicks on the suggestion item, insert the value into the input field
                b.addEventListener("click", function(e) {
                    let fullValue = input.value;
                    let prefix = lastCommaIndex === -1 ? '' : fullValue.substring(0, lastCommaIndex + 1);
                    input.value = prefix + this.getElementsByTagName("input")[0].value;

                    // Close the list of autocompleted values
                    closeAllLists();
                });

                a.appendChild(b);
            }
        }
    });

    // Handle keydown events in the input field
    input.addEventListener("keydown", function(e) {
        let x = document.getElementById(this.id + "-autocomplete-list");
        if (x) x = x.getElementsByTagName("div");

        // If the DOWN arrow key is pressed, increase the currentFocus variable
        if (e.keyCode === 40) {
            currentFocus++;
            addActive(x);

        // If the UP arrow key is pressed, decrease the currentFocus variable
        } else if (e.keyCode === 38) {
            currentFocus--;
            addActive(x);

        // If the ENTER key is pressed, prevent the form from being submitted
        } else if (e.keyCode === 13) {
            e.preventDefault();
            if (currentFocus > -1) {
                // Simulate a click on the active item
                if (x && x[currentFocus]) {
                    x[currentFocus].click();
                }
            }
        }
    });

    function addActive(x) {
        // A function to classify an item as "active"
        if (!x || x.length === 0) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        if (x[currentFocus]) {
            x[currentFocus].classList.add("autocomplete-active");
        }
    }

    function removeActive(x) {
        // A function to remove the "active" class from all autocomplete items
        for (let i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        // Close all autocomplete lists in the document, except the one passed as an argument
        let x = document.getElementsByClassName("autocomplete-items");
        for (let i = 0; i < x.length; i++) {
            if (elmnt !== x[i] && elmnt !== input) {
                if (x[i].parentNode) {
                    x[i].parentNode.removeChild(x[i]);
                }
            }
        }
    }

    // Execute a function when someone clicks in the document
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    // Initialize autocomplete for the two text areas
    const proteinDomainInput = document.getElementById("protein-domain");
    const domainPatternInput = document.getElementById("domain-pattern");

    // Ensure elements exist before initializing autocomplete
    if (proteinDomainInput) {
        autocomplete(proteinDomainInput, domain_array);
    }
    if (domainPatternInput) {
        autocomplete(domainPatternInput, domain_array);
    }
});
