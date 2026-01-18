'use client';

import { useCalculator } from '@/hooks/useCalculator';
import { Header, Footer } from '@/components/layout';
import { Card, CardTitle } from '@/components/ui';
import {
  RiderStatsSection,
  ClimbSelector,
  CustomClimbForm,
  ClimbInfoCard,
  FormulaDetails,
  GearingSection,
  FAQ
} from '@/components/calculator';

export default function Home() {
  const { state, derived, actions } = useCalculator();

  const isCustomClimb = state.selectedClimbId === 'custom';
  const isCustomComplete = isCustomClimb
    ? (state.customClimb.distance !== null &&
       state.customClimb.elevation !== null &&
       state.customClimb.gradient !== null)
    : true;

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <Header />

      {/* Rider Stats Section */}
      <RiderStatsSection
        unitSystem={state.unitSystem}
        riderWeightKg={state.riderWeight}
        bikeWeightKg={state.bikeWeight}
        power={state.power}
        powerToWeight={derived.powerToWeight}
        powerCategory={derived.powerCategory}
        onUnitSystemChange={actions.setUnitSystem}
        onRiderWeightChange={actions.setRiderWeight}
        onBikeWeightChange={actions.setBikeWeight}
        onPowerChange={actions.setPower}
      />

      {/* Climb Selection Section */}
      <Card>
        <CardTitle>Select Climb</CardTitle>

        <ClimbSelector
          selectedClimbId={state.selectedClimbId}
          onChange={actions.setClimb}
        />

        {isCustomClimb && (
          <CustomClimbForm
            distance={state.customClimb.distance}
            elevation={state.customClimb.elevation}
            gradient={state.customClimb.gradient}
            onFieldChange={actions.setCustomClimbField}
          />
        )}

        <ClimbInfoCard
          climb={derived.selectedClimb}
          climbResult={derived.climbResult}
          isCustom={isCustomClimb}
          isComplete={isCustomComplete}
          unitSystem={state.unitSystem}
        />

        <FormulaDetails
          riderWeight={derived.riderWeightKg}
          bikeWeight={derived.bikeWeightKg}
          power={state.power}
          powerToWeight={derived.powerToWeight}
          climb={derived.selectedClimb}
          climbResult={derived.climbResult}
        />
      </Card>

      {/* Gearing Section */}
      <GearingSection
        speedKmh={derived.avgSpeedKmh}
        selectedChainringId={state.selectedChainringId}
        selectedCassetteId={state.selectedCassetteId}
        gearAnalysis={derived.gearAnalysis}
        onChainringChange={actions.setChainring}
        onCassetteChange={actions.setCassette}
        unitSystem={state.unitSystem}
      />

      {/* FAQ Section for AEO */}
      <FAQ />

      <Footer />
    </main>
  );
}
