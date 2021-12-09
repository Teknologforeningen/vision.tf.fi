import React from "react"
import { DonateProps, Donation } from "./donate"
import DonationSummary from "./donationsummary"
import GroupAssociator from "./groupassociator"

const Confirmation: React.FC<{
  donation: Donation | null
  labels: DonateProps
}> = ({ donation, labels }) => (
  donation === null ? (
    <p>Hämtar donationsuppgifter...</p>
  ) : (
    <div>
      <h2>Tack för din donation!</h2>
      <p>
        Vi vill varmt tacka för att du är med och stöttar Träffpunkt Aalto.
        Ditt stöd är ovärderligt för genomförandet av nästa steg i Teknologföreningens historia.
      </p>
      <p>
        Ifall du valde att din donation får vara synlig kommer ditt namn eller din pseudonym nu att synas på donationssidan.
        Du kan även associera donationen med en grupp av andra donatorer i formuläret nedan:
      </p>
      <fieldset>
        <legend><span>Gruppdonation (valfri)</span></legend>
        <GroupAssociator />
      </fieldset>
      <p>
        En länk till denna bekräftelsesida har skickats till din e-postadress med en kopia av nedanstående donationsuppgifter:
      </p>
      <fieldset>
        <legend><span>Donationsuppgifter</span></legend>
        <DonationSummary donation={donation} labels={labels} />
      </fieldset>
    </div>
  )
)

export default Confirmation
