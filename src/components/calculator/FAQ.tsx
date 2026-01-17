'use client';

import { Collapsible } from '@/components/ui';
import { SmallCollapsible } from '@/components/ui/Collapsible';

const faqs = [
  {
    question: 'How is cycling climb time calculated?',
    answer: 'Climb time is calculated using physics-based formulas that account for your power output (watts), total mass (rider + bike weight), and the climb gradient. The calculation considers three main forces: gravitational resistance (the primary force when climbing), rolling resistance from tire friction, and aerodynamic drag. At typical climbing speeds (10-20 km/h), gravity dominates, which is why power-to-weight ratio is so important for climbing performance.'
  },
  {
    question: 'What is a good power-to-weight ratio for cycling?',
    answer: 'Power-to-weight ratio (W/kg) varies significantly by fitness level. Recreational cyclists typically produce 2.0-2.5 W/kg, regular training cyclists 2.5-3.5 W/kg, trained amateurs 3.5-4.5 W/kg, competitive racers 4.5-5.5 W/kg, and professional Tour de France climbers can sustain 6.0+ W/kg on major mountain stages. Your power-to-weight directly determines your climbing speed.'
  },
  {
    question: 'What cadence should I target when climbing?',
    answer: 'The optimal climbing cadence for most cyclists is between 70-90 RPM. Lower cadences (60-70 RPM) put more stress on your muscles but less on your cardiovascular system, while higher cadences (90-100 RPM) are more aerobically demanding but spare your leg muscles. Most professional cyclists prefer 80-95 RPM even on steep climbs. Choose a cadence that feels sustainable for the duration of your climb.'
  },
  {
    question: 'What gear ratio is best for climbing?',
    answer: 'The ideal climbing gear depends on the gradient and your fitness level. For steep climbs (8%+), compact chainrings (50/34) paired with wide-range cassettes (11-34 or larger) provide the easiest gearing. A 34x34 gear gives a 1:1 ratio, which most cyclists can manage on gradients up to 15%. For very steep climbs or if you prefer higher cadence, consider sub-compact chainrings (48/32) or gravel-oriented cassettes (11-42 or larger).'
  },
  {
    question: 'What are gear inches?',
    answer: 'Gear inches is a traditional measure of bicycle gearing that represents the equivalent diameter of a directly-driven wheel (like a penny-farthing). It is calculated as (Chainring teeth ÷ Cog teeth) × Wheel diameter in inches. A typical road bike wheel is 27 inches. Lower gear inches (20-40") mean easier pedaling ideal for climbing, while higher gear inches (80-120") mean harder pedaling suited for flat terrain and descending.'
  },
  {
    question: 'How does bike weight affect climb time?',
    answer: 'Bike weight directly impacts climbing performance because you must lift the entire mass (rider + bike) against gravity. Every 1 kg of weight saved translates to roughly 0.3-0.5% faster climbing times at typical amateur power outputs. However, rider weight has a much larger impact since it typically accounts for 85-90% of total mass. Losing 1 kg of body weight while maintaining power output provides the same benefit as removing 1 kg from your bike.'
  },
  {
    question: 'Why does gradient affect speed so much?',
    answer: 'Gradient has an exponential effect on climbing difficulty because the gravitational force you must overcome increases proportionally. At 5% gradient, gravity accounts for about 60% of resistance. At 10%, it is over 80%. At 15%, nearly 90%. This is why doubling the gradient more than halves your speed at the same power output. Steep sections (12%+) require disproportionately more effort and significantly reduce average speed.'
  }
];

export function FAQ() {
  return (
    <Collapsible title="Frequently Asked Questions" defaultOpen={false}>
      <div className="space-y-1">
        {faqs.map((faq, index) => (
          <SmallCollapsible key={index} title={faq.question}>
            <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
              {faq.answer}
            </p>
          </SmallCollapsible>
        ))}
      </div>
    </Collapsible>
  );
}
