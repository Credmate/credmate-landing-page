// Steps navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const steps = document.querySelectorAll('._1st-point');
    const dotTriggers = document.querySelectorAll('.dot-trigger');
    let currentStep = 0;

    // Function to find specific step by title
    function findStepByTitle(title) {
        for(let i = 0; i < steps.length; i++) {
            const problemEl = steps[i].querySelector('.probelm');
            if(problemEl && problemEl.textContent.trim() === title) {
                return i;
            }
        }
        return -1;
    }

    // Function to update step styles and button visibility
    function updateStepStyles(index) {
        // Update steps
        steps.forEach((step, i) => {
            const problem = step.querySelector('.probelm');
            const statement = step.querySelector('.statement');
            const statement2 = step.querySelector('.statement._2');
            const navButtons = step.querySelector('.nex-previous');
            
            if (i === index) {
                // Make current step bold and show navigation
                if (problem) {
                    problem.style.fontWeight = '700';
                    problem.style.color = '#000000';
                }
                if (statement && !statement.classList.contains('_2')) {
                    statement.style.fontWeight = '700';
                    statement.style.color = '#000000';
                }
                if (statement2) {
                    statement2.style.fontWeight = '700';
                    statement2.style.color = '#000000';
                }
                if (navButtons) {
                    navButtons.style.display = 'block';
                    navButtons.style.opacity = '1';
                }
                
                // Scroll the step into view
                step.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                // Make other steps normal and hide navigation
                if (problem) {
                    problem.style.fontWeight = '400';
                    problem.style.color = '#B0B0B0';
                }
                if (statement && !statement.classList.contains('_2')) {
                    statement.style.fontWeight = '400';
                    statement.style.color = '#B0B0B0';
                }
                if (statement2) {
                    statement2.style.fontWeight = '400';
                    statement2.style.color = '#B0B0B0';
                }
                if (navButtons) {
                    navButtons.style.display = 'none';
                    navButtons.style.opacity = '0';
                }
            }
        });

        // Update dot triggers
        dotTriggers.forEach((trigger, i) => {
            if (i === index) {
                trigger.classList.add('active');
            } else {
                trigger.classList.remove('active');
            }
        });
    }

    // Add click handlers to dot triggers
    dotTriggers.forEach((trigger, index) => {
        trigger.addEventListener('click', function() {
            let targetStep = -1;
            
            if (index === 0) {
                targetStep = findStepByTitle('Report Borrower');
            } else if (index === 1) {
                targetStep = findStepByTitle('Give Credit');
            } else if (index === 2) {
                targetStep = findStepByTitle('Request Credit');
            }

            if (targetStep !== -1) {
                currentStep = targetStep;
                updateStepStyles(currentStep);
            }
        });
    });

    // Add click handlers to all next buttons
    document.querySelectorAll('.next-wrapper').forEach((nextBtn) => {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (currentStep < steps.length - 1) {
                currentStep++;
                updateStepStyles(currentStep);
            }
        });
    });

    // Add click handlers to all previous buttons
    document.querySelectorAll('.previous-wrapper').forEach((prevBtn) => {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (currentStep > 0) {
                currentStep--;
                updateStepStyles(currentStep);
            }
        });
    });

    // Initialize first step
    updateStepStyles(0);
});
