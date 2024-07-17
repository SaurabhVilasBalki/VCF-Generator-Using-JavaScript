document.getElementById('saveContactBtn').addEventListener('click', function() {
    // Replace with actual contact information
    var contactInfo = {
        firstName: 'Saurabh',
        lastName: 'Balki',
        organization: 'Example',
        title: 'Example',
        phone: '+91 5416486546',
        email: 'example@gmail.com',
        address: ';;Street; Area;State;Pin;Country',
        website: 'example.com'
    };

    // Construct vCard content
    var vCardData = 'BEGIN:VCARD\n' +
                    'VERSION:3.0\n' +
                    'FN:' + contactInfo.firstName + ' ' + contactInfo.lastName + '\n' +
                    'N:' + contactInfo.lastName + ';' + contactInfo.firstName + ';;;\n' +
                    'ORG:' + contactInfo.organization + '\n' +
                    'TITLE:' + contactInfo.title + '\n' +
                    'TEL;TYPE=WORK,VOICE:' + contactInfo.phone + '\n' +
                    'EMAIL;TYPE=PREF,INTERNET:' + contactInfo.email + '\n' +
                    'URL:' + contactInfo.website + '\n' +
                    'ADR;TYPE=WORK:' + contactInfo.address + '\n' +
                    'END:VCARD';

    // Create a Blob object for the vCard data
    var blob = new Blob([vCardData], { type: 'text/vcard' });

    // Check if the device is iOS
    var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    // If iOS, use FileReader to create a data URL for download
    if (iOS) {
        var reader = new FileReader();
        reader.onload = function(event) {
            var dataUrl = event.target.result;

            // Create a temporary link element
            var a = document.createElement('a');
            a.style.display = 'none';
            a.href = dataUrl;
            a.setAttribute('download', contactInfo.firstName+ contactInfo.lastName +'.vcf');
            document.body.appendChild(a);

            // Simulate click to trigger download
            a.click();

            // Clean up
            document.body.removeChild(a);
        };
        reader.readAsDataURL(blob);
    } else {
        // For non-iOS devices, create a direct download link
        var url = window.URL.createObjectURL(blob);

        // Create a link element
        var a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.setAttribute('download', contactInfo.firstName+ contactInfo.lastName +'.vcf');
        document.body.appendChild(a);

        // Simulate click to trigger download
        a.click();

        // Clean up
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    }

    // Inform the user to open the downloaded file and import it into Contacts app
    alert('Please open the downloaded vCard file and import it into your Contacts app.');
    window.open("example.com", "_blank");
});