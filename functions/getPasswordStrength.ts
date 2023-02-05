// taken from the mantine.dev progress example since I'm a lazy man

function getPasswordStrength(p: string) {
    const requirements = [
        { re: /[0-9]/, label: 'Includes number' },
        { re: /[a-z]/, label: 'Includes lowercase letter' },
        { re: /[A-Z]/, label: 'Includes uppercase letter' },
        { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
    ];

    let multiplier = p.length > 5 ? 0 : 1;

    requirements.forEach((requirement) => {
        if (!requirement.re.test(p)) {
            multiplier += 1;
        }
    });

    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

export { getPasswordStrength }