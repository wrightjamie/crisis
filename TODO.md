# TODOs

- [x] Explore use of fallow (Skipped for now)
- [x] Generate remaining 4 generic crisis images (Press Conference, UN Meeting, Cyber Command, Riot Police) once API rate limit resets
- [x] Refactor scenario event structure into a branching tree with prerequisites
- [x] Implement score-based gating for event unlocking
- [x] Create a "Scenario Explorer" tree view for the Facilitator interface
- [ ] Remove Masonry.js polyfill from facilitator.html once CSS grid-lanes is widely supported
- [x] Create a knowledge wiki covering game assets and terminology
- [x] Add a mechanism for users to take manual actions outside of a structured scenario (which might trigger otherwise disabled scenarios)
- [x] Add pre-game options to set initial variables (e.g. baseline US support) to introduce variety
- [x] Perform a full review of our CSS and styles approach to ensure consistency and modern design practices.
- [x] Visually indicate in the UI when new Manual Actions become available to players.
- [x] Allow manual actions to be shown as "disabled" rather than completely hidden when conditions aren't met.
- [x] Generate remaining asset images (Keflavik Air Base [regenerate], USS Harry S. Truman, Ramstein Air Base) once API rate limit resets
- [x] Kick player and allow a new player to join
- [x] Move to a shared image library (`data/image-library.json` and `public/images/library/`) with title, description, and freeform tags across all scenarios
- [x] Populate and assign 100% image coverage across all 13 scenarios in the game (including generating 11 new assets for Global Pandemic, Project Icarus, and Mars Colony Rebellion)

## Image Audit: Shoehorned Images To Replace With Bespoke Artwork

While all 13 scenarios now have functional image mappings in place so no UI cards are blank, several scenarios rely on heavily shoehorned or anachronistic images from other eras or settings. These items are fully specified with prompt formulas and metadata in the artifact and will be generated once the AI generation quota resets (exhausted with reset expected ~22-Oct-2026 21:40 UTC):

### 1. D-Day: Operation Overlord (dday_overlord) — Critical WWII Anachronisms
- [ ] Asset: "Omaha, Utah, Gold, Juno, Sword Beaches" (omaha_beach, utah_beach, gold_beach, juno_beach, sword_beach) — Currently uses modern Royal Navy RFA Mounts Bay amphibious dock ship. Needs authentic 1944 LCVP Higgins boats approaching Normandy beaches under German machine-gun fire.
- [ ] Asset: "Caen" (caen) — Currently uses modern British mechanized infantry in APC. Needs ruined 1944 Norman stone town under allied aerial bombardment.
- [ ] Asset: "Cherbourg Deep Water Port" (cherbourg) — Currently uses modern commercial container port in Odesa. Needs 1944 French deep-water port with scuttled ships and concrete Atlantic Wall fortifications.
- [ ] Asset: "Pointe du Hoc" (pointe_du_hoc) — Currently uses modern soldiers. Needs 2nd Ranger Battalion scaling sheer 100-foot chalk cliffs with rope ladders and grappling hooks.
- [ ] Event: "Airborne Drops & Gliders" (th1_airborne_start, th1_pegasus_gliders, th1_glider_reinforcements, th1_glider_crash) — Currently uses modern RAF A400M turboprop. Needs WWII C-47 Skytrains dropping paratroopers and wooden Horsa gliders in dark Norman night skies.
- [ ] Event: "German Panzer Counter-Attacks" (th1_21st_panzer, th3_counter_attack_carentan, ev_panzer_assault, act_axis_release_panzers) — Currently uses modern Ukrainian T-72 tanks. Needs 1944 German Panzer IV / Tiger tanks advancing through Normandy bocage hedgerows.
- [ ] Event: "Luftwaffe Sortie" (ev_luftwaffe_appearance) — Currently uses modern Soviet Tu-95 Bear bomber shadowed by RAF Typhoon. Needs WWII Messerschmitt Bf 109 or Fw 190 fighters.
- [ ] Event: "Allied Air Supremacy" (ev_allied_air_superiority) — Currently uses 2020s Eurofighter Typhoon. Needs WWII Supermarine Spitfires, Hawker Typhoons, or P-51 Mustangs with invasion stripes.
- [ ] Event: "Maquis Rail Sabotage" (ev_french_sabotage) — Currently uses modern Russian logistics rail depot explosion. Needs French resistance fighters blowing up a WWII steam locomotive in rural France.
- [ ] Event: "Axis Artillery Spotters" (th2_artillery_spotters) — Currently uses a modern commercial quadcopter drone. Needs German forward observers with trench periscopes and rangefinders.
- [ ] Event: "Hitler & OKW Command Decisions" (ev_hitler_wakes, ev_hitler_sleeps, fac_axis_strategic_reserve) — Currently uses 2026 COBRA situation room with glowing blue digital displays. Needs Berghof / Wolf's Lair map room with paper situation maps.

### 2. Cuban Missile Crisis 1962 (cuban_missile_crisis) — Cold War Era Mismatches
- [ ] Asset: "San Cristobal MRBM Site" (a_cuba_missile_site) — Currently uses modern Russian Iskander TEL in a pine forest. Needs 1962 Soviet R-12 Dvina (SS-4 Sandal) canvas-covered medium-range ballistic missile launch pads in tropical Cuban jungle clearing.
- [ ] Asset: "US Quarantine Line" (a_us_blockade, ev_thread1_quarantine_init) — Currently uses modern nuclear supercarrier USS Harry S. Truman. Needs 1962 US Navy Gearing/Fletcher-class destroyers and Essex-class ASW carrier intercepting freighters.
- [ ] Asset: "Soviet Submarine B-59" (ev_thread1_sub_encounter, ev_thread1_b59_surfaces, act_ussr_sub_patrol) — Currently uses ultra-modern British Astute-class nuclear submarine. Needs 1962 Soviet Project 641 Foxtrot-class diesel-electric submarine forced to surface in choppy waters.
- [ ] Event: "U-2 Reconnaissance Sorties" (ev_thread3_intel_init, ev_thread3_u2_survives, act_usa_recon) — Currently uses RAF RC-135W Rivet Joint 4-engine airliner. Needs high-altitude Lockheed U-2 Dragon Lady glider-winged spy plane above the Caribbean.
- [ ] Event: "U-2 Shot Down Over Cuba" (ev_thread3_u2_shot_down, ev_u2_shot_down_manual) — Currently uses modern F-35 stealth jet SAM interception. Needs U-2 wreckage / SA-2 Guideline missile launch over Cuba.
- [ ] Event: "EXCOMM & Oval Office Deliberations" (ev_start, ev_thread2_trollope_ploy, ev_endgame_trigger) — Currently uses 2026 COBRA crisis cabinet. Needs JFK's 1962 Cabinet Room / Oval Office with Kennedy, McNamara, and Bundy around paper maps.

### 3. Mars Colony Rebellion 2084 (mars_colony_rebellion) — Sci-Fi / Setting Mismatches
- [ ] Asset: "UNS Resolve Orbital Flagship" (a_un_flagship) — Currently uses alien invasion mothership (ev_mothership_alt) due to quota limit. Needs dedicated UN Space Command battlecruiser in low Mars orbit.
- [ ] Event: "Martian Smuggler Freighter" (ev_thread2_blockade_run, ev_thread2_boarding_trap, ev_thread2_boarding_success) — Currently uses captured alien saucer (ev_alien_tech). Needs rugged civilian asteroid-belt cargo freighter.
- [ ] Event: "Earth Protests" (ev_thread3_earth_protests, ev_thread3_rebels_emboldened) — Currently uses rainy contemporary London Whitehall and Manchester streets. Needs futuristic 2084 mega-city Earth protests with holographic displays.
- [ ] Event: "Surface-to-Orbit Missiles" (ev_thread2_martian_retaliation) — Currently uses F-35 air strike (ev_f35_fail). Needs Martian surface missile silo battery launching kinetic interceptors into space.

### 4. Falklands II (falklands_2) — Setting Mismatches
- [ ] Asset: "Port Stanley" (port_stanley) — Currently uses Caribbean Government House in Tortola with palm trees (bvi_gov_house). Needs the windswept, treeless, sub-Antarctic coastal town of Stanley with colorful tin roofs and harbor jetties.
- [ ] Asset: "RAF Mount Pleasant" (mount_pleasant) — Currently uses generic European NATO base. Needs the stark, treeless East Falkland peat-bog military complex under cold grey skies.
- [ ] Asset: "Argentine Air Bases" (rio_gallegos, rio_grande) — Currently uses NATO air base. Needs Patagonian military airbases in southern Argentina with Super Etendard / Skyhawk revetments.
- [ ] Event: "Naval Defeat in South Atlantic" (ev_naval_defeat) — Currently uses Portsmouth naval dockyard missile strike (ev_portsmouth_strike). Needs burning UK frigate in rough South Atlantic seas.
- [ ] Event: "Air Raid on Mount Pleasant" (ev_air_raid) — Currently uses Cyprus Akrotiri strike (ev_akrotiri_strike). Needs Argentine air-launched cruise missile strikes on Mount Pleasant runway.

### 5. Caribbean Hurricane (caribbean_crisis) — Specific Scene Refinements
- [ ] Event: "US Coast Guard Cutter" (ev_us_coastguard) — Currently uses Royal Navy Type 23 frigate with White Ensign. Needs white USCG Legend/Famous-class cutter with red-and-blue hull racing stripe.
- [ ] Event: "Stadium Field Hospital" (ev_stadium_hospital) — Currently uses combat medevac from a warzone. Needs makeshift civilian medical clinic inside a storm-damaged tropical athletic stadium.
- [ ] Event: "Telecom Restoration Offer" (ev_telecom_offer) — Currently uses GCHQ Bude satellite intercept dishes in Cornwall. Needs storm-battered cellular telecom mast on a lush tropical hillside.
- [ ] Event: "Waterborne Illness / Epidemic" (ev_illness, ev_epidemic) — Currently uses London train station terrorist CBRN hazmat response. Needs open-air tropical relief camp medical isolation ward.
- [ ] Event: "Naval Task Force" (ev_task_force) — Currently uses aircraft carrier HMS Prince of Wales. Needs multi-ship amphibious disaster relief flotilla with support auxiliaries and landing craft.

### 6. Global Pandemic & Project Icarus Refinements
- [ ] Global Pandemic: "Vaccine Nationalism / Production" (ev_vaccine_hoarding) — Currently uses military transport loading munitions crates. Needs automated pharmaceutical vaccine vial bottling line under armed cold-chain security.
- [ ] Project Icarus: "European & Asian Nodes" (node_eu, node_asia) — Currently reuses North American node (node_na). Needs distinct European alpine facility and Asian mega-industrial atmospheric injector.
- [ ] Project Icarus: "Mass Climate Refugee Border" (ev_climate_refugees) — Currently uses Caribbean food riot (ev_airdrop_riot). Needs massive climate migration checkpoint across arid borderlands.

## Caribbean Crisis Tasks
- [x] Generate image: RFA Mounts Bay (Bay-class landing ship) `/images/assets/rfa_mounts_bay.png`
- [x] Generate image: Governor House (BVI) `/images/assets/bvi_gov_house.png`
- [x] Generate image: Terrance B. Lettsome Airport (Debris/Flooded) `/images/assets/bvi_airport.png`
- [x] Generate event images: Hurricane Zephyr Map, Flooded Hospital, Airdrop Riot, etc.

## Missing Images To Bring Life to Scenarios

### Caribbean Hurricane: Ticking Clock (caribbean_crisis)
- [x] Event: "COBRA Briefing: Initial Response" (ev_start) needs an image
- [x] Event: "A400M Airborne" (ev_a400_enroute) needs an image
- [x] Event: "RFA Mounts Bay En Route" (ev_rfa_enroute) needs an image
- [x] Event: "Hospital Generators Failing" (ev_hospital_power) needs an image
- [x] Event: "Prison Roof Collapsed" (ev_prison_damage) needs an image
- [x] Event: "Desalination Plant Destroyed" (ev_water_plant) needs an image
- [x] Event: "Resort Flooded" (ev_tourist_resort) needs an image
- [x] Event: "Arteries Blocked" (ev_roads_blocked) needs an image
- [x] Event: "Police Absent" (ev_police_disband) needs an image
- [x] Event: "Port Cranes Collapsed" (ev_port_damage) needs an image
- [x] Event: "Emergency Funds" (ev_funds_request) needs an image
- [x] Event: "A400M in Airspace" (ev_a400_arrives) needs an image
- [x] Event: "RFA Arrives" (ev_rfa_arrives) needs an image
- [x] Event: "Hospital Loses Power" (ev_hospital_blackout) needs an image
- [x] Event: "Airport Cleared" (ev_airport_cleared) needs an image
- [x] Event: "Cruise Ship Offer" (ev_cruise_ship) needs an image
- [x] Event: "US Coast Guard Offers Cutter" (ev_us_coastguard) needs an image
- [x] Event: "Stadium Hospital" (ev_stadium_hospital) needs an image
- [x] Event: "Fuel Contaminated" (ev_fuel_contam) needs an image
- [x] Event: "Media Demands Timeline" (ev_media_timeline) needs an image
- [x] Event: "HNWI Demands" (ev_hnwi_evac) needs an image
- [x] Event: "SAR Success" (ev_sar_dogs) needs an image
- [x] Event: "Potable Water Depleted" (ev_water_runs_out) needs an image
- [x] Event: "Waterborne Illness" (ev_illness) needs an image
- [x] Event: "Pharmacy Raided" (ev_pharmacy_raid) needs an image
- [x] Event: "NGOs Refuse to Operate" (ev_ngo_refusal) needs an image
- [x] Event: "Telecom Restoration Offer" (ev_telecom_offer) needs an image
- [x] Event: "Evacuation Clashes" (ev_foreign_clash) needs an image
- [x] Event: "Tabloid Attack" (ev_tabloid_attack) needs an image
- [x] Event: "Weather Warning" (ev_weather_warning) needs an image
- [x] Event: "Secondary Swell Hits" (ev_secondary_weather) needs an image
- [x] Event: "Criminal Gangs Take Control" (ev_gangs_emerge) needs an image
- [x] Event: "Prison Break" (ev_prison_riot) needs an image
- [x] Event: "Gunfire at Gov Residence" (ev_gunfire_gov) needs an image
- [x] Event: "Local Gov Threatens US Intervention" (ev_local_threat) needs an image
- [x] Event: "Curfew Declared" (ev_curfew) needs an image
- [x] Event: "Port Riots" (ev_port_riot) needs an image
- [x] Event: "Black Market Emerges" (ev_black_market) needs an image
- [x] Event: "Media Crew Attacked" (ev_media_attacked) needs an image
- [x] Event: "Bridge Collapse" (ev_bridge_collapse) needs an image
- [x] Event: "Mass Exodus" (ev_mass_exodus) needs an image
- [x] Event: "Marines Retake Prison" (ev_marines_push) needs an image
- [x] Event: "Epidemic Confirmed" (ev_epidemic) needs an image
- [x] Event: "Naval Task Force Arrives" (ev_task_force) needs an image
- [x] Event: "Donor Conference" (ev_donor_conf) needs an image
- [x] Event: "Officials Arrested" (ev_arrest_officials) needs an image
- [x] Event: "Police Mutiny" (ev_mutiny) needs an image
- [x] Event: "Turning Point Address" (ev_turning_point) needs an image
- [x] Event: "45 Minutes Reached" (ev_endgame_trigger) needs an image
- [x] Event: "Scenario Concluded: Success" (ev_end_success) needs an image
- [x] Event: "Scenario Concluded: Mitigated Disaster" (ev_end_mixed) needs an image
- [x] Event: "Scenario Concluded: Total Collapse" (ev_end_failure) needs an image

### Eastern Front Breach (eastern_front_breach)
- [x] Asset: "72nd Mechanized Brigade" (brigade_alpha) needs an image
- [x] Asset: "Central Supply Hub" (supply_depot) needs an image
- [x] Asset: "Aerorozvidka Unit" (drone_squad) needs an image
- [x] Event: "Enemy Armored Push" (evt_armor_push) needs an image
- [x] Event: "Brigade Alpha Encirclement Threat" (evt_encirclement_threat) needs an image
- [x] Event: "Missile Strike on Supply Depot" (evt_depot_strike) needs an image
- [x] Action: "Request Emergency Resupply" (act_request_resupply) needs an image

### Independence Day: Global Supremacy (independence_day)
- [x] Event: "Shadows Over Earth" (ev_start) needs an image
- [x] Event: "Energy Signatures Detected" (ev_first_strike_prep) needs an image
- [x] Event: "Rare Earth Monopoly" (ev_china_hoard) needs an image
- [x] Event: "European Grid Collapse" (ev_russia_false_flag) needs an image
- [x] Event: "Fighters Downed" (ev_arms_race_start) needs an image
- [x] Event: "Intelligence Coup" (ev_espionage_uk) needs an image
- [x] Event: "Cyber Infiltration" (ev_espionage_china) needs an image
- [x] Event: "45 Minutes: The Final Stand" (ev_endgame_trigger) needs an image
- [x] Event: "Total Extinction" (ev_end_extinction) needs an image
- [x] Event: "Pyrrhic Victory" (ev_end_pyrrhic) needs an image

### Metropolis Blackout (metropolis_blackout)
- [x] Asset: "Metro General Hospital" (main_hospital) needs an image
- [x] Asset: "Central Police Precinct" (central_precinct) needs an image
- [x] Asset: "Power Substation Alpha" (substation_alpha) needs an image
- [x] Event: "Hospital Generator Failure" (evt_hospital_power_failure) needs an image
- [x] Event: "Central Precinct Vulnerable" (evt_precinct_vulnerable) needs an image
- [x] Event: "Supermarket Riot" (evt_supermarket_riot) needs an image
- [x] Action: "Release Emergency Funds" (act_emergency_funds) needs an image

### Tutorial Scenario (tutorial)
- [x] Asset: "Main Water Treatment Plant" (water_treatment) needs an image
- [x] Asset: "Rescue Helicopter" (rescue_heli) needs an image
- [x] Event: "Flash Flood Warning Issued" (evt_flood_warning) needs an image
- [x] Event: "Traffic Jam During Evacuation" (evt_evac_jam) needs an image
- [x] Event: "Water Plant Threat" (evt_water_plant) needs an image
- [x] Action: "Hold Press Conference" (act_press_conference) needs an image

### UK Crisis: Russian Tensions (uk_crisis)
- [x] Event: "Russian Submarine Surfaces in the Channel" (ev_sub_surfaces) needs an image
- [x] Event: "Severing of Undersea Internet Cables" (ev_undersea_cables) needs an image
- [x] Event: "UK Forces Casualty Leaks to Press" (ev_uk_casualty_leak) needs an image
- [x] Event: "Attempted Chemical Attack on UK Soil" (ev_chemical_attempt) needs an image
- [x] Event: "US Declares European Neutrality" (ev_us_neutrality) needs an image
- [x] Event: "Hypersonic Strike on RAF Akrotiri" (ev_akrotiri_strike) needs an image
- [x] Event: "NATO Article 5 Ambiguity" (ev_article5_ambiguity) needs an image
- [x] Event: "Coordinated Strikes on RAF Bases" (ev_raf_bases_strike) needs an image
- [x] Event: "Strike on HMNB Portsmouth" (ev_portsmouth_strike) needs an image
- [x] Event: "First Strike on HMNB Clyde (Faslane)" (ev_faslane_strike_1) needs an image
- [x] Event: "Second Strike on HMNB Clyde" (ev_faslane_strike_2) needs an image
- [x] Event: "Targeted Strike on UK Power Grid" (ev_power_grid_strike) needs an image
- [x] Event: "Total Airspace Incursion" (ev_airspace_incursion) needs an image
- [x] Event: "Imminent Nuclear Readiness Detected" (ev_nuclear_readiness) needs an image
- [x] Event: "CABINET DECISION: Final Authorization" (ev_final_authorization) needs an image
- [x] Event: "US Authorizes Logistics Support" (ev_us_support_success) needs an image
- [x] Event: "US Declines Immediate Logistics Support" (ev_us_support_fail) needs an image
- [x] Event: "Backchannel Success: Russia Agrees to Pause" (ev_russia_deescalate) needs an image
- [x] Event: "Backchannel Failure: Russia Leaks Call" (ev_russia_leak) needs an image
- [x] Event: "Covert Cyber Offensive Successful" (ev_cyber_success) needs an image
- [x] Event: "Covert Cyber Offensive Thwarted" (ev_cyber_fail) needs an image
- [x] Event: "Special Forces Operation Success" (ev_sf_success) needs an image
- [x] Event: "Special Forces Operation Compromised" (ev_sf_fail) needs an image
- [x] Event: "Deep Strike Success" (ev_f35_success) needs an image
- [x] Event: "Deep Strike Failure" (ev_f35_fail) needs an image
- [x] Event: "European Coalition Formed" (ev_eu_success) needs an image
- [x] Event: "European Coalition Fails" (ev_eu_fail) needs an image
- [x] Event: "END GAME: Diplomatic Breakthrough" (ev_endgame_diplomatic) needs an image
- [x] Event: "END GAME: Domestic Collapse" (ev_endgame_domestic) needs an image
- [x] Event: "END GAME: European Defence Pact" (ev_endgame_eu_defense) needs an image
- [x] Event: "Strike Planning Leaked" (ev_strike_options_leak) needs an image
- [x] Event: "Strike Planning Secured" (ev_strike_options_secured) needs an image
- [x] Event: "Strike Options Ready" (ev_strike_options_ready) needs an image
- [x] Action: "Request Deep Strike Options" (act_request_strike_options) needs an image
- [x] Action: "Strike Russian Airbase (F-35)" (act_strike_airbase) needs an image
- [x] Action: "Strike Russian C2 Node (F-35)" (act_strike_c2) needs an image
- [x] Action: "European Coalition Building" (act_eu_coalition) needs an image

### Op Sovereign Sky: Air Power Doctrine (op_sovereign_sky)
- [x] Asset: "RAF Brize Norton (UK Hub)" (a_brize) needs an image
- [x] Asset: "RAF Waddington (ISR Hub)" (a_waddington) needs an image
- [x] Asset: "RAF Akrotiri (Forward Spoke)" (a_akrotiri) needs an image
- [x] Asset: "P-8A Poseidon MRA1" (a_poseidon) needs an image
- [x] Asset: "RC-135W Rivet Joint" (a_rivetjoint) needs an image
- [x] Asset: "Chinook & Puma JHC Detachment" (a_chinook) needs an image
- [x] Event: "2.2 Asymmetric Warfare: Insurgent Drone Swarm on Perimeter" (ev_7_asymmetric_swarm) needs an image
- [x] Event: "3.3 Limitations of Air Attack: Weather & Limited Payload" (ev_13_weather_payload) needs an image
- [x] Event: "3.5 Information Activities: Non-Kinetic Attack (EW & PsyOps)" (ev_15_urban_roe) needs an image
- [x] Event: "4.1 Airborne Operations: Air-Drop vs Air-Land" (ev_16_airborne_ops) needs an image
- [x] Event: "4.3 Intra-Theatre Mobility: Joint Helicopter Command (Chinook & Puma)" (ev_18_littoral_jhc) needs an image
- [x] Event: "4.4 Personnel Recovery (Combat Recovery) & 3-Tier Medevac" (ev_19_csar_medevac) needs an image
- [x] Event: "ENDGAME B: Logistical Culmination & Independent Air Fallacy" (ev_endgame_culmination) needs an image
- [x] Event: "Information Activities: Psychological Operations Broadcast" (ev_psyops_broadcast) needs an image

