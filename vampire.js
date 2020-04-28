class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }
  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let vampCount = 0;
    let currentVamp = this;
    while (currentVamp.creator !== null) {
      vampCount += 1;
      currentVamp = currentVamp.creator;
    }
    return vampCount;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {

    if (this.name === name) {
      return this;
    } else {
      for (const childNode of this.offspring) {
        const vampWithName = childNode.vampireWithName(name);
        if (vampWithName) {
          return vampWithName;
        }
      }
      return null;
    }
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let totalVamps = 0;

    for (let child of this.offspring) {
      totalVamps += child.totalDescendents + 1;
    }
    return totalVamps;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let millenials = [];

    if (this.yearConverted > 1980) {
      millenials.push(this);
    }
    for (const child of this.offspring) {
      millenials = millenials.concat(child.allMillennialVampires);
    }
    return millenials;
  }
  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {

    let A = this.lineage;
    let B = vampire.lineage;

    if (A.length !== 0 && B.length !== 0) {
      for (let ancestor of A) {
        for (let candidate of B) {
          if (ancestor === candidate) return ancestor;
        }
      }
    } else {
      return (A.length === 0) ? this : vampire;
    }
  }

  // helper function to get current vampire's line of creators to the root node
  // returns array of vampires, including the vampire itself
  get lineage() {
    let currentVamp = this;
    let ancestors = [];
    while (currentVamp != null) {
      ancestors.push(currentVamp);
      currentVamp = currentVamp.creator;
    }
    return ancestors;
  }
}

module.exports = Vampire;

